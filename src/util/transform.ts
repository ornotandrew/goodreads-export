import { RawReview, Extract, Review, Book, RawBook } from '../types';

export function indexBy<T, K extends string | number>(
  items: Array<T>,
  getIndex: (item: T) => K
): Record<K, T> {
  return items.reduce((acc, item) => ({ ...acc, [getIndex(item)]: item }), {} as Record<K, T>);
}

export const unique = <T, K>(items: T[], getIndex: (item: T) => K) => [
  ...new Set(items.map(getIndex)),
];

export const mostRecentlyStarted = (a: RawReview, b: RawReview) => {
  // If neither of the books have been started, compare their shelved dates
  if (!a.timeline.started && !b.timeline.started) {
    return b.timeline.shelved.localeCompare(a.timeline.shelved);
  }

  // Otherwise, started books always appear before "un"started books
  if (!a.timeline.started && b.timeline.started) {
    return 1;
  }
  if (a.timeline.started && !b.timeline.started) {
    return -1;
  }

  // Started books are ordered by most-recently-started first
  return b.timeline.shelved.localeCompare(a.timeline.shelved);
};

export const reviewsFromExtract = (extract: Extract): Review[] => {
  return extract.reviews.map((review) => {
    const book = { ...extract.booksByUrl[review.bookUrl] } as any;

    book.author = extract.authorsByUrl[book.authorUrl];
    delete book.authorUrl;

    if (book.series) {
      book.series = extract.seriesByUrl[book.series.url];
    }

    const fullReview = { ...review, book };
    delete fullReview.bookUrl;

    return fullReview;
  });
};
