import { getListPage, getReview } from './goodreads'
import * as parse from './parse'

export async function getAllReviewIds(listId: number): Promise<number[]> {
  let allReviewIds = []
  let page = 1
  while (true) {
    const { reviewIds, progress, isLastPage } = parse.reviewIds(await getListPage(listId, page))
    console.log(progress)
    allReviewIds = allReviewIds.concat(reviewIds)
    if (isLastPage) {
      break
    } else {
      page++
    }
  }

  return allReviewIds
}

export interface ReviewInfo {
  shelved: string
  started?: string
  finished?: string
  progress: {
    percent?: number
    page?: number
    date: string
  }[]
}

export async function getReviewInfo(reviewId: number) {
  const parsed = parse.review(await getReview(reviewId))

  const timeline: ReviewInfo = {
    shelved: parsed.shelved, // we expect this to always be here
    started: parsed.started || null,
    finished: parsed.finished || null,
    progress: []
  }
  timeline.started && timeline.progress.push({ percent: 0, page: 0, date: timeline.started })
  timeline.finished && timeline.progress.push({ percent: 100, page: null, date: timeline.finished })

  Object.entries(parsed).forEach(([progressDescription, date]) => {
    if (progressDescription in timeline) {return }
    timeline.progress.push({
      percent: parseFloat(progressDescription),
      page: null,
      date
    })
  })

  timeline.progress.sort((a, b) => a.percent < b.percent ? -1 : 1)

  return { timeline }
}

async function extract(listId: number): Promise<object[]> {
  const reviewIds = await getAllReviewIds(listId)
  await Promise.all(reviewIds.map(getReviewInfo))
  // await getReviewInfo(3741591694)
  return [{}]
}

export default extract
