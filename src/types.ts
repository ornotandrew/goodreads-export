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
  positionInSeries?: number;
  series?: {
    url: string;
    name: string;
  };
}

export interface RawAuthor {
  url: string;
  name: string;
  birthDate: string;
  deathDate?: string;
  genres?: string[];
  websiteUrl?: string;
  twitterUrl?: string;
}

export interface RawSeries {
  url: string;
  name: string;
  works: {
    primary: number;
    total: number;
  };
}

export type Extract = {
  reviews: RawReview[];
  booksByUrl: Record<string, RawBook>;
  authorsByUrl: Record<string, RawAuthor>;
  seriesByUrl: Record<string, RawSeries>;
};

// export type Book = Omit<RawBook, 'authorUrl' | 'series'> & {
//   author: Author;
//   positionInSeries?: number;
//   series?: Series;
// };
