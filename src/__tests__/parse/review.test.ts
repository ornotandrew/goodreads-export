import { getListPage } from '../../goodreads';
import * as parse from '../../parse/review';
import { reviewIds as ids } from '../constants';

describe('reviewIds', () => {
  test('first page', async () =>
    expect(parse.reviewIds(await getListPage(ids.list, 1))).toEqual({
      reviewIds: [
        4607154278, 4442529457, 4442527388, 4133971336, 4102009601, 4102009585, 4042314061,
        4042313987, 4042313921, 4042313829, 4042313753, 4042313679, 4042313619, 4042236308,
        4042236270, 4042236215, 4042236160, 4042236119, 4042236058, 4042234724, 4042233564,
        4042233513, 4042233466, 4042233420, 4042232035, 4042231996, 4042231953, 4042228639,
        4042228580, 4042228528,
      ],
      progress: {
        current: 30,
        total: 173,
      },
      isLastPage: false,
    }));

  test('last page', async () =>
    expect(parse.reviewIds(await getListPage(ids.list, 6))).toEqual({
      reviewIds: [
         1212356469,
         1212355380,
         1212355195,
         1212355073,
         1212354908,
         1212354437,
         1212353566,
         1212353093,
         1212352795,
         1212352680,
         1212352520,
         1212352317,
         1212352263,
         1212352045,
         1212352023,
         1212351592,
         1212351058,
         1212350611,
         1212350022,
         1212349965,
         1212349793,
         1212349691,
         1212349510,
 
      ],
      progress: {
        current: 173,
        total: 173,
      },
      isLastPage: true,
    }));
});
