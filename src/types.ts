export interface RawBook {
  url: string
  title: string
  description: string
  authorUrl: string
  imageUrl: string
  isbn: number
  pageCount: number
  seriesUrl?: string
}

export interface Author {
  url: string
  name: string
  birthDate: string
  deathDate?: string
  genres?: string[]
  websiteUrl?: string
  twitterUrl?: string
}

export interface Series {
  url: string
  name: string
  works: {
    primary: number
    total: number
  }
}

export type Book = Omit<RawBook, 'authorUrl' | 'seriesUrl'> & {
  author: Author
  series?: Series
}

export interface ReviewTimeline {
  shelved: string
  started?: string
  finished?: string
  progress: {
    percent: number
    date: string
  }[]
}

export interface Review {
  reviewId: number
  bookUrl: string
  timeline: ReviewTimeline
}

export type Extract = Omit<Review, 'bookUrl'> & { book: Book }
