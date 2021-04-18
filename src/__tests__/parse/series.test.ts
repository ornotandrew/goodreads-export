import { getGenericUrl } from '../../goodreads'
import * as parse from '../../parse/series'
import { seriesUrls as urls } from '../constants'

/* eslint-disable max-len */
describe('series', () => {
  test('Wheel of Time', async () => expect(parse.series(await getGenericUrl(urls.wheelOfTime))).toEqual({
    name: 'The Wheel of Time Series',
    works: {
      primary: 14,
      total: 46
    }
  }))

  test('Farseer Trilogy', async () => expect(parse.series(await getGenericUrl(urls.farseerTrilogy))).toEqual({
    name: 'The Farseer Trilogy by Robin Hobb',
    works: {
      primary: 3,
      total: 7
    }
  }))

  test('Horus Heresy', async () => expect(parse.series(await getGenericUrl(urls.horusHeresy))).toEqual({
    name: 'The Horus Heresy Series',
    works: {
      primary: 54,
      total: 329
    }
  }))
})
/* eslint-enable max-len */
