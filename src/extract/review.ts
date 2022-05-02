import { getListPage, getReview } from '../goodreads';
import * as parse from '../parse/review';
import cliProgress from 'cli-progress';
import { RawReview, ReviewTimeline } from '../types';
import { barOptions } from '../util/cli';

export const getAllReviewIds = async (
  listId: number,
  multibar: cliProgress.MultiBar
): Promise<number[]> => {
  let allReviewIds: number[] = [];

  const { reviewIds, progress, isLastPage } = parse.reviewIds(await getListPage(listId, 1));
  const bar = multibar.create(progress.total, progress.current, barOptions('Review IDs', '📋'));
  allReviewIds = allReviewIds.concat(reviewIds)
  if (isLastPage) {
    return allReviewIds
  }

  let page = 2;
  
  while (true) {
    const { reviewIds, progress, isLastPage } = parse.reviewIds(await getListPage(listId, page));
    bar.update(progress.current);
    allReviewIds = allReviewIds.concat(reviewIds);
    if (isLastPage) {
      break;
    } else {
      page++;
    }
  }

  return allReviewIds;
};

export const getReviewInfo = async (reviewId: number): Promise<RawReview> => {
  const { bookUrl, updates } = parse.review(await getReview(reviewId));

  const timeline: ReviewTimeline = {
    shelved: updates.shelved, // we expect this to always be here
    started: updates.started || null,
    finished: updates.finished || null,
    progress: [],
  };
  timeline.started && timeline.progress.push({ percent: 0, date: timeline.started });
  timeline.finished && timeline.progress.push({ percent: 100, date: timeline.finished });

  Object.entries(updates).forEach(([progressDescription, date]) => {
    if (progressDescription in timeline) {
      return;
    }
    timeline.progress.push({
      percent: parseFloat(progressDescription),
      date,
    });
  });

  timeline.progress.sort((a, b) => (a.percent < b.percent ? -1 : 1));

  return {
    reviewId,
    bookUrl,
    timeline,
  };
};
