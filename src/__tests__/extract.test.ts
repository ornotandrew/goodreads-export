import { getAllReviewIds, getReviewInfo } from '../extract'
import * as goodreads from '../goodreads'
import { ids } from './constants'

describe('getAllReviewIds', () => {
  test('gets all the review IDs from all pages', async () => {
    const actual = await getAllReviewIds(ids.list)
    expect(goodreads.getListPage as jest.Mock).toHaveBeenCalledTimes(5)
    expect(actual.length).toEqual(131)
  })
})

describe('getReviewInfo', () => {
  test('basic', async () => {
    const actual = await getReviewInfo(ids.basicReview)
    expect(actual).toEqual({
      timeline: {
        shelved: '2021-01-03',
        started: '2019-09-30',
        finished: '2019-11-01',
        progress: [
          { percent: 0, page: 0, date: '2019-09-30' },
          { percent: 100, page: null, date: '2019-11-01' },
        ]
      }
    })
  })

  test('with progress', async () => {
    const actual = await getReviewInfo(ids.withProgress)
    expect(actual).toEqual({
      timeline: {
        shelved: '2020-10-22',
        started: '2020-10-22',
        finished: '2020-12-22',
        progress: [
          { percent: 0, page: 0, date: '2020-10-22' },
          { percent: 27, page: null, date: '2020-11-12' },
          { percent: 89, page: null, date: '2020-12-15' },
          { percent: 100, page: null, date: '2020-12-22' },
        ]
      }
    })
  })
})
