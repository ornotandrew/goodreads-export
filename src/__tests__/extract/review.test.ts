import { getAllReviewIds, getReviewInfo } from '../../extract/review'
import * as goodreads from '../../goodreads'
import { reviewIds as ids } from '../constants'

describe('getAllReviewids', () => {
  test('gets all the review ids.reviews.from all pages', async () => {
    const actual = await getAllReviewIds(ids.list)
    expect(goodreads.getListPage as jest.Mock).toHaveBeenCalledTimes(5)
    expect(actual.length).toEqual(131)
  })
})

describe('getReviewInfo', () => {
  test('basic', async () => {
    const actual = await getReviewInfo(ids.reviews.basic)
    expect(actual).toEqual({
      reviewId: ids.reviews.basic,
      bookUrl: 'https://www.goodreads.com/book/show/22016392-assassin-s-quest',
      timeline: {
        shelved: '2021-01-03',
        started: '2019-09-30',
        finished: '2019-11-01',
        progress: [
          { percent: 0, date: '2019-09-30' },
          { percent: 100, date: '2019-11-01' },
        ]
      }
    })
  })

  test('with progress', async () => {
    const actual = await getReviewInfo(ids.reviews.progress)
    expect(actual).toEqual({
      reviewId: ids.reviews.progress,
      bookUrl: 'https://www.goodreads.com/book/show/35231.Lord_of_Chaos',
      timeline: {
        shelved: '2020-10-22',
        started: '2020-10-22',
        finished: '2020-12-22',
        progress: [
          { percent: 0, date: '2020-10-22' },
          { percent: 27, date: '2020-11-12' },
          { percent: 89, date: '2020-12-15' },
          { percent: 100, date: '2020-12-22' },
        ]
      }
    })
  })

  test('with progress as page number', async () => {
    const actual = await getReviewInfo(ids.reviews.pageNumberProgress)
    expect(actual).toEqual({
      reviewId: ids.reviews.pageNumberProgress,
      bookUrl: 'https://www.goodreads.com/book/show/13890.A_Crown_of_Swords',
      timeline: {
        shelved: '2020-12-22',
        started: '2020-12-22',
        finished: null,
        progress: [
          { percent: 0, date: '2020-12-22' },
          { percent: 37, date: '2021-01-08' },
          { percent: 60, date: '2021-01-30' },
        ]
      }
    })
  })

  test('with "shelved as" update', async () => {
    const actual = await getReviewInfo(ids.reviews.shelvedAs)
    expect(actual).toEqual({
      reviewId: ids.reviews.shelvedAs,
      bookUrl: 'https://www.goodreads.com/book/show/22016387-royal-assassin',
      timeline: {
        shelved: '2021-01-03',
        started: '2019-08-15',
        finished: '2019-09-30',
        progress: [
          { percent: 0, date: '2019-08-15' },
          { percent: 100, date: '2019-09-30' },
        ]
      }
    })
  })

  test('without a start date', async () => {
    const actual = await getReviewInfo(ids.reviews.withoutStartDate)
    expect(actual).toEqual({
      reviewId: ids.reviews.withoutStartDate,
      bookUrl: 'https://www.goodreads.com/book/show/7664041-inheritance',
      timeline: {
        shelved: '2020-07-03',
        started: null,
        finished: '2009-01-01',
        progress: [
          { percent: 100, date: '2009-01-01' },
        ]
      }
    })
  })
})
