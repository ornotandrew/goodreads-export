import { getGenericUrl } from '../../goodreads';
import * as parse from '../../parse/series';
import { seriesUrls as urls } from '../constants';

/* eslint-disable max-len */
describe('series', () => {
  test('The Wheel of Time', async () =>
    expect(parse.series(await getGenericUrl(urls.wheelOfTime))).toEqual({
      works: {
        primary: 15,
        total: 60,
      },
    }));

  test('The Farseer Trilogy', async () =>
    expect(parse.series(await getGenericUrl(urls.farseerTrilogy))).toEqual({
      works: {
        primary: 3,
        total: 7,
      },
    }));

  test('The Horus Heresy', async () =>
    expect(parse.series(await getGenericUrl(urls.horusHeresy))).toEqual({
      works: {
        primary: 58,
        total: 345,
      },
    }));

  test('The Lord of the Rings', async () =>
    expect(parse.series(await getGenericUrl(urls.lordOfTheRings))).toEqual({
      works: {
        primary: 3,
        total: 15,
      },
    }));
});
/* eslint-enable max-len */
