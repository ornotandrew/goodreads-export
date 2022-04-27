import { getAllReviewIds, getReviewInfo } from './review';
import { getBookInfo } from './book';
import { getAuthorInfo } from './author';
import { attachSeriesName, getSeriesInfo } from './series';
import cliProgress from 'cli-progress';
import { barOptions, batchedPromiseAll, indexBy, mostRecentlyStarted, unique } from '../util';
import { Extract } from '../types';

const batchSize = 30;

const batchedFetchAndIndex = async <T, V>(
  fetchFn: (arg: V) => Promise<T>,
  urls: V[],
  indexFn: (item: T) => string | number,
  bar: cliProgress.SingleBar
): Promise<Record<string | number, T>> => {
  bar.setTotal(urls.length);
  return indexBy(
    await batchedPromiseAll(
      async (arg: V) => {
        const item = await fetchFn(arg);
        bar.increment();
        return item;
      },
      urls.map((x) => [x]),
      batchSize
    ),
    indexFn
  );
};

const url = <T extends { url: any }>(item: T) => item.url;

async function extract(listId: number, multibar: cliProgress.MultiBar): Promise<Extract> {
  const reviewIds = await getAllReviewIds(listId, multibar);

  // Create the bars up here so that they are all visible from the outset
  const bars = {
    reviewInfo: multibar.create(reviewIds.length, 0, barOptions('Reviews', '⭐️')),
    bookInfo: multibar.create(0, 0, barOptions('Books', '📕')),
    authorInfo: multibar.create(0, 0, barOptions('Authors', '👩')),
    seriesInfo: multibar.create(0, 0, barOptions('Series', '📚')),
  };

  // NOTE: There is no memoization for the function calls below. It's the
  // responsibility of this code to ensure no unnecessary calls are made.

  const reviewsById = await batchedFetchAndIndex(
    getReviewInfo,
    reviewIds,
    // reviews are unique - fetch all of them.
    (review) => review.reviewId,
    bars.reviewInfo
  );

  const booksByUrl = await batchedFetchAndIndex(
    getBookInfo,
    unique(Object.values(reviewsById), (review) => review.bookUrl),
    url,
    bars.bookInfo
  );

  // The below could theoretically happen in parallel, but we don't want to
  // get rate limited
  const authorsByUrl = await batchedFetchAndIndex(
    getAuthorInfo,
    unique(Object.values(booksByUrl), (book) => book.authorUrl),
    url,
    bars.authorInfo
  );

  const seriesByUrl = await batchedFetchAndIndex(
    getSeriesInfo,
    unique(Object.values(booksByUrl), (book) => book.series?.url).filter((x) => !!x),
    url,
    bars.authorInfo
  );

  return {
    reviews: Object.values(reviewsById).sort(mostRecentlyStarted),
    booksByUrl,
    authorsByUrl,
    seriesByUrl: attachSeriesName(seriesByUrl, booksByUrl),
  };
}

export default extract;
