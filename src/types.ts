export interface Book {
  title: string
  authorUrl: string
  description: string
  imageUrl: string
  isbn: number
  pageCount: number
  seriesUrl?: string
}

export type Author = {
  name: string
  birthDate: string
  deathDate?: string
  genres?: string[]
  websiteUrl?: string
  twitterUrl?: string
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

export interface Extract extends Review {
  book: Book
  author: Author
}
