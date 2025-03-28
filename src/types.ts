export interface ReviewTimeline {
  shelved: string;
  started: string | null;
  finished: string | null;
  progress: {
    percent: number;
    date: string;
  }[];
}

export interface RawReview {
  reviewId: number;
  bookUrl: string;
  timeline: ReviewTimeline;
}

export interface RawBook {
  url: string;
  title: string;
  description: string;
  authorUrl: string;
  imageUrl: string;
  isbn: number | null;
  pageCount: number;
  genres: string[];
  positionInSeries?: number;
  series?: {
    url: string;
    name: string;
  };
}

export interface Author {
  url: string;
  name: string;
  birthDate: string | null;
  deathDate: string | null;
  genres: string[] | null;
  websiteUrl: string | null;
  twitterUrl: string | null;
}

export interface Series {
  url: string;
  name: string;
  works: {
    primary: number;
    total: number;
  };
}

// Designed for data storage. Items are deduplicated and indexed at the
// top-level.
export type Extract = {
  reviews: RawReview[];
  booksByUrl: Record<string, RawBook>;
  authorsByUrl: Record<string, Author>;
  seriesByUrl: Record<string, Series>;
};

// The types below are designed for ease-of use. This library provides
// functions to convert an Extract to these types.
export type Book = Omit<RawBook, 'authorUrl' | 'seriesUrl'> & {
  author: Author;
  series?: Series;
};

export type Review = Omit<RawReview, 'bookUrl'> & {
  book: Book;
};
