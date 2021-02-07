import { getAllReviewIds, getReviewInfo, ReviewInfo } from './review'
import { getBookInfo } from './book'
import { Book } from '../parse/book'

interface Extract extends ReviewInfo {
  book: Book
}

async function extract(listId: number): Promise<Extract[]> {
  console.log(`[list: ${listId}] fetching`)
  const reviewIds = await getAllReviewIds(listId)
  return Promise.all(reviewIds.map(async reviewId => {
    console.log(`[review: ${reviewId}] fetching review`)
    const review = await getReviewInfo(reviewId)
    console.log(`[review: ${reviewId}] fetching book`)
    const book = await getBookInfo(review.bookUrl)
    return { ...review, book }
  }))
}

export default extract
