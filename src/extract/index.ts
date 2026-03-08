import { getAllReviewIds, getReviewInfo } from './review';
import { getBookInfo } from './book';
import { getAuthorInfo } from './author';
import { attachSeriesName, getSeriesInfo } from './series';
import cliProgress from 'cli-progress';
import { Extract, RawReview, RawBook, Author, Series } from '../types';
import { indexBy, mostRecentlyStarted, unique } from '../util/transform';
import { batchedPromiseAll } from '../util/dataFetching';
import { barOptions, createBar } from '../util/cli';

const batchSize = 10;

const batchedFetchAndIndex = async <T, V>(
  fetchFn: (arg: V) => Promise<T>,
  urls: V[],
  indexFn: (item: T) => string | number,
  bar: cliProgress.SingleBar
): Promise<Record<string, T>> => {
  bar.setTotal(urls.length);
  const results = await batchedPromiseAll(
    async (arg: V) => {
      const item = await fetchFn(arg);
      bar.increment();
      return item;
    },
    urls.map((x) => [x]),
    batchSize
  );
  return indexBy(results, indexFn);
};

const url = <T extends { url: any }>(item: T) => item.url;

function getUrlsFromArray<T>(items: T[], getUrl: (item: T) => string): string[] {
  return [...new Set(items.map(getUrl))];
}

async function extract(
  listId: number, 
  multibar: any, 
  existingExtract?: Extract | null
): Promise<Extract> {
  // Get current review IDs from Goodreads
  const currentReviewIds = await getAllReviewIds(listId, multibar);
  
  let existingReviewsById: Record<string, RawReview> = {};
  let existingBooksByUrl: Record<string, RawBook> = {};
  let existingAuthorsByUrl: Record<string, Author> = {};
  let existingSeriesByUrl: Record<string, Series> = {};

  // If incremental mode and we have existing data, diff to find new reviews
  if (existingExtract) {
    // Index existing reviews by ID for quick lookup
    existingReviewsById = indexBy(
      existingExtract.reviews, 
      (r: RawReview) => String(r.reviewId)
    );
    existingBooksByUrl = existingExtract.booksByUrl;
    existingAuthorsByUrl = existingExtract.authorsByUrl;
    existingSeriesByUrl = existingExtract.seriesByUrl;

    // Get existing review IDs
    const existingReviewIds = new Set(
      existingExtract.reviews.map((r: RawReview) => String(r.reviewId))
    );

    // Find new review IDs (in current but not in existing)
    const reviewIdsToFetch = currentReviewIds.filter(
      id => !existingReviewIds.has(String(id))
    );

    // Find removed reviews (in existing but not in current)
    const currentReviewIdSet = new Set(currentReviewIds.map(String));
    const removedCount = Object.keys(existingReviewsById).filter(
      id => !currentReviewIdSet.has(id)
    ).length;

    if (removedCount > 0) {
      console.error(`Note: ${removedCount} reviews no longer in your Goodreads list (will be removed from export)`);
    }

    if (reviewIdsToFetch.length === 0) {
      console.error(`No new reviews to fetch. Using existing data (${existingExtract.reviews.length} reviews).`);
      
      // Return existing data with current sort order
      return {
        reviews: currentReviewIds
          .map(id => existingReviewsById[String(id)])
          .filter(Boolean)
          .sort(mostRecentlyStarted),
        booksByUrl: existingBooksByUrl,
        authorsByUrl: existingAuthorsByUrl,
        seriesByUrl: existingSeriesByUrl,
      };
    }

    console.error(`Found ${reviewIdsToFetch.length} new reviews to fetch`);
    
    // Create the bars
    const bars = {
      reviewInfo: createBar(reviewIdsToFetch.length, 0, barOptions('Reviews', '⭐️')),
      bookInfo: createBar(1, 0, barOptions('Books', '📕')),
      authorInfo: createBar(1, 0, barOptions('Authors', '👩')),
      seriesInfo: createBar(1, 0, barOptions('Series', '📚')),
    };

    // Fetch only new reviews
    const newReviewsById = await batchedFetchAndIndex(
      getReviewInfo,
      reviewIdsToFetch,
      (review: RawReview) => String(review.reviewId),
      bars.reviewInfo
    );

    // Merge with existing reviews (keep existing ones still in the list)
    const reviewsById: Record<string, RawReview> = {};
    for (const id of currentReviewIds) {
      const sid = String(id);
      if (existingReviewsById[sid]) {
        reviewsById[sid] = existingReviewsById[sid];
      } else if (newReviewsById[sid]) {
        reviewsById[sid] = newReviewsById[sid];
      }
    }

    // Get all book URLs from new reviews
    const newBookUrls = getUrlsFromArray(
      Object.values(newReviewsById) as RawReview[],
      (r: RawReview) => r.bookUrl
    );

    // Fetch book info for new books only
    const newBooks: Record<string, RawBook> = {};
    if (newBookUrls.length > 0) {
      console.error(`Fetching ${newBookUrls.length} new books`);
      bars.bookInfo.setTotal(newBookUrls.length);
      const fetched = await batchedFetchAndIndex(getBookInfo, newBookUrls, url, bars.bookInfo);
      Object.assign(newBooks, fetched);
    }

    // Merge with existing books
    const booksByUrl: Record<string, RawBook> = { ...existingBooksByUrl, ...newBooks };

    // Get author URLs from new books
    const newAuthorUrls = getUrlsFromArray(
      Object.values(newBooks) as RawBook[],
      (b: RawBook) => b.authorUrl
    );

    // Fetch author info for new authors only
    const newAuthors: Record<string, Author> = {};
    if (newAuthorUrls.length > 0) {
      console.error(`Fetching ${newAuthorUrls.length} new authors`);
      bars.authorInfo.setTotal(newAuthorUrls.length);
      const fetched = await batchedFetchAndIndex(getAuthorInfo, newAuthorUrls, url, bars.authorInfo);
      Object.assign(newAuthors, fetched);
    }

    // Merge with existing authors
    const authorsByUrl: Record<string, Author> = { ...existingAuthorsByUrl, ...newAuthors };

    // Get series URLs from new books
    const newSeriesUrls = getUrlsFromArray(
      Object.values(newBooks).filter((b: RawBook) => !!b.series) as RawBook[],
      (b: RawBook) => b.series!.url
    );

    // Fetch series info for new series only
    const newSeries: Record<string, Series> = {};
    if (newSeriesUrls.length > 0) {
      console.error(`Fetching ${newSeriesUrls.length} new series`);
      bars.seriesInfo.setTotal(newSeriesUrls.length);
      const fetched = await batchedFetchAndIndex(getSeriesInfo, newSeriesUrls, url, bars.seriesInfo);
      Object.assign(newSeries, fetched);
    }

    // Merge with existing series
    const seriesByUrl: Record<string, Series> = { ...existingSeriesByUrl, ...newSeries };

    return {
      reviews: Object.values(reviewsById).sort(mostRecentlyStarted),
      booksByUrl,
      authorsByUrl,
      seriesByUrl: attachSeriesName(seriesByUrl, booksByUrl),
    };
  }

  // Full export (non-incremental)
  const bars = {
    reviewInfo: createBar(currentReviewIds.length, 0, barOptions('Reviews', '⭐️')),
    bookInfo: createBar(1, 0, barOptions('Books', '📕')),
    authorInfo: createBar(1, 0, barOptions('Authors', '👩')),
    seriesInfo: createBar(1, 0, barOptions('Series', '📚')),
  };

  const reviewsById = await batchedFetchAndIndex(
    getReviewInfo,
    currentReviewIds,
    (review: RawReview) => String(review.reviewId),
    bars.reviewInfo
  );

  const booksByUrl = await batchedFetchAndIndex(
    getBookInfo,
    getUrlsFromArray(Object.values(reviewsById) as RawReview[], (r: RawReview) => r.bookUrl),
    url,
    bars.bookInfo
  );

  const authorsByUrl = await batchedFetchAndIndex(
    getAuthorInfo,
    getUrlsFromArray(Object.values(booksByUrl) as RawBook[], (b: RawBook) => b.authorUrl),
    url,
    bars.authorInfo
  );

  const seriesByUrl = await batchedFetchAndIndex(
    getSeriesInfo,
    getUrlsFromArray(
      Object.values(booksByUrl).filter((b: RawBook) => !!b.series) as RawBook[],
      (b: RawBook) => b.series!.url
    ),
    url,
    bars.seriesInfo
  );

  return {
    reviews: Object.values(reviewsById).sort(mostRecentlyStarted),
    booksByUrl,
    authorsByUrl,
    seriesByUrl: attachSeriesName(seriesByUrl, booksByUrl),
  };
}

export default extract;