import { getAllReviewIds, getReviewInfo } from './review'

async function extract(listId: number): Promise<object[]> {
  const reviewIds = await getAllReviewIds(listId)
  return Promise.all(reviewIds.map(getReviewInfo))
}

export default extract
