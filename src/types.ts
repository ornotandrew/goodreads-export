export interface ReviewTimeline {
  shelved: string;
  started?: string;
  finished?: string;
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
  isbn: number;
  pageCount: number;
  genreHierarchy: string[][]; // genres appear in order of importance
  positionInSeries?: number;
  series?: {
    url: string;
    name: string;
  };
}

export interface Author {
  url: string;
  name: string;
  birthDate: string;
  deathDate?: string;
  genres?: string[];
  websiteUrl?: string;
  twitterUrl?: string;
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
  genreUrls: Record<string, string>;
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
