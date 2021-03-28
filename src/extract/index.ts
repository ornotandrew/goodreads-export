import { getAllReviewIds, getReviewInfo } from './review'
import { getBookInfo } from './book'
import { getAuthorInfo } from './author'
import cliProgress from 'cli-progress'
import { barOptions, batchedPromiseAll } from '../util'
import { Extract } from '../types'

const batchSize = 30

async function extract(listId: number, multibar: cliProgress.MultiBar): Promise<Extract[]> {
  const reviewIds = await getAllReviewIds(listId, multibar)

  const bars = {
    reviewInfo: multibar.create(reviewIds.length, 0, barOptions('Reviews', '⭐️')),
    bookInfo: multibar.create(reviewIds.length, 0, barOptions('Books', '📕')),
    authorInfo: multibar.create(reviewIds.length, 0, barOptions('Authors', '👩')),
  }

  const results = await batchedPromiseAll(async (reviewId: number) => {
    const review = await getReviewInfo(reviewId)
    bars.reviewInfo.increment()

    const book = await getBookInfo(review.bookUrl)
    bars.bookInfo.increment()

    const author = await getAuthorInfo(book.authorUrl)
    bars.authorInfo.increment()

    return { ...review, book, author }
  }, reviewIds.map(id => [id]), batchSize)

  return results
}

export default extract
