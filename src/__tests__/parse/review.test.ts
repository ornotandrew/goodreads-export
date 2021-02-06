import { getListPage } from '../../goodreads'
import * as parse from '../../parse/review'
import { ids } from '../constants'

describe('reviewIds', () => {
  test('first page', async () => expect(parse.reviewIds(await getListPage(ids.list, 1))).toEqual({
    reviewIds: [
      3741591694, 3741589581, 3741585716, 3710281051, 3670257038, 3608220474, 3593565675, 3559698351, 3549496453,
      3441223965, 3423938026, 3423936091, 3423931998, 3288171828, 3251158655, 3219362819, 3134153021, 2975504644,
      2975504568, 2975504500, 2975504187, 2975503955, 2975503750, 2975503073, 2786298818, 2786285904, 2741457802,
      2741457356, 2741457299, 2741457075,
    ],
    progress: '30 of 131',
    isLastPage: false
  }))

  test('last page', async () => expect(parse.reviewIds(await getListPage(ids.list, 5))).toEqual({
    reviewIds: [
      1212352263, 1212352045, 1212352023, 1212351592, 1212351058, 1212350611, 1212350022, 1212349965, 1212349793,
      1212349691, 1212349510,
    ],
    progress: '131 of 131',
    isLastPage: true
  }))
})
