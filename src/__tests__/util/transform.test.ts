import { mostRecentlyStarted } from '../../util/transform';
import { RawReview } from '../../types';

const makeReview = (started: string | null, shelved?: string) =>
  ({
    timeline: {
      started,
      shelved: shelved ?? started,
    },
  } as unknown as RawReview);

describe('mostRecentlyStarted', () => {
  test('none started', () => {
    expect(
      [
        makeReview(null, '2022-01-01'),
        makeReview(null, '2022-01-02'),
        makeReview(null, '2022-01-03'),
      ].sort(mostRecentlyStarted)
    ).toEqual([
      makeReview(null, '2022-01-03'),
      makeReview(null, '2022-01-02'),
      makeReview(null, '2022-01-01'),
    ]);
  });

  test('all started', () => {
    expect(
      [makeReview('2022-01-01'), makeReview('2022-01-02'), makeReview('2022-01-03')].sort(
        mostRecentlyStarted
      )
    ).toEqual([makeReview('2022-01-03'), makeReview('2022-01-02'), makeReview('2022-01-01')]);
  });

  test('mixed', () => {
    expect(
      [
        makeReview(null, '2022-01-01'),
        makeReview(null, '2022-01-02'),
        makeReview(null, '2022-01-03'),
        makeReview('2022-01-01'),
        makeReview('2022-01-02'),
        makeReview('2022-01-03'),
      ].sort(mostRecentlyStarted)
    ).toEqual([
      makeReview('2022-01-03'),
      makeReview('2022-01-02'),
      makeReview('2022-01-01'),
      makeReview(null, '2022-01-03'),
      makeReview(null, '2022-01-02'),
      makeReview(null, '2022-01-01'),
    ]);
  });
});
