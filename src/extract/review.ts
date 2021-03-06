import { getListPage, getReview } from '../goodreads'
import * as parse from '../parse/review'
import cliProgress from 'cli-progress'
import { asyncMemo, barOptions } from '../util'

export const getAllReviewIds = asyncMemo(async(listId: number, multibar: cliProgress.MultiBar): Promise<number[]> => {
  let bar: cliProgress.SingleBar
  let allReviewIds = []
  let page = 1
  while (true) {
    const { reviewIds, progress, isLastPage } = parse.reviewIds(await getListPage(listId, page))
    if (page === 1) {
      bar = multibar.create(progress.total, progress.current, barOptions('Review IDs', '📋'))
    } else {
      bar.update(progress.current)
    }
    allReviewIds = allReviewIds.concat(reviewIds)
    if (isLastPage) {
      break
    } else {
      page++
    }
  }

  return allReviewIds
})

interface ReviewInfoTimeline {
  shelved: string
  started?: string
  finished?: string
  progress: {
    percent: number
    date: string
  }[]
}

export interface ReviewInfo {
  reviewId: number
  bookUrl: string
  timeline: ReviewInfoTimeline
}

export const getReviewInfo = asyncMemo(async (reviewId: number): Promise<ReviewInfo> => {
  const { bookUrl, updates } = parse.review(await getReview(reviewId))

  const timeline: ReviewInfoTimeline = {
    shelved: updates.shelved, // we expect this to always be here
    started: updates.started || null,
    finished: updates.finished || null,
    progress: []
  }
  timeline.started && timeline.progress.push({ percent: 0, date: timeline.started })
  timeline.finished && timeline.progress.push({ percent: 100, date: timeline.finished })

  Object.entries(updates).forEach(([progressDescription, date]) => {
    if (progressDescription in timeline) { return }
    timeline.progress.push({
      percent: parseFloat(progressDescription),
      date
    })
  })

  timeline.progress.sort((a, b) => a.percent < b.percent ? -1 : 1)

  return {
    reviewId,
    bookUrl,
    timeline
  }
})
