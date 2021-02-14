import { getAllReviewIds, getReviewInfo, ReviewInfo } from './review'
import { getBookInfo } from './book'
import { Book } from '../parse/book'
import cliProgress from 'cli-progress'
import { barOptions } from '../util'


interface Extract extends ReviewInfo {
  book: Book
}

async function extract(listId: number, multibar: cliProgress.MultiBar): Promise<Extract[]> {
  const reviewIds = await getAllReviewIds(listId, multibar)

  const bars = {
    reviewInfo: multibar.create(reviewIds.length, 0, barOptions('Reviews', '⭐️')),
    bookInfo: multibar.create(reviewIds.length, 0, barOptions('Books', '📕')),
  }

  const results = await Promise.all(reviewIds.map(async reviewId => {
    const review = await getReviewInfo(reviewId)
    bars.reviewInfo.increment()

    const book = await getBookInfo(review.bookUrl)
    bars.bookInfo.increment()
    return { ...review, book }
  }))

  return results
}

export default extract
