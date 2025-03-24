import { getListPage } from '../../goodreads';
import * as parse from '../../parse/review';
import { reviewIds as ids } from '../constants';

describe('reviewIds', () => {
  test('first page', async () =>
    expect(parse.reviewIds(await getListPage(ids.list, 1))).toEqual({
      reviewIds: [
        7404813115, 7404807872, 6904136953, 6714318202, 6714315873, 6714314661, 6714312965,
        6714312739, 6714312495, 6714311744, 6714311098, 6714310488, 6714309290, 6714306613,
        6714306024, 6714305318, 6714304630, 6714303868, 5567147416, 5173057312,
      ],
      progress: {
        current: 20,
        total: 208,
      },
      isLastPage: false,
    }));

  test('last page', async () =>
    expect(parse.reviewIds(await getListPage(ids.list, 11))).toEqual({
      reviewIds: [
        1212351592, 1212351058, 1212350611, 1212350022, 1212349965, 1212349793, 1212349691,
        1212349510,
      ],
      progress: {
        current: 208,
        total: 208,
      },
      isLastPage: true,
    }));
});
