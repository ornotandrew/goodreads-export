import { getGenericUrl } from '../goodreads';
import * as parse from '../parse/series';
import { Series } from '../types';
import { asyncMemo } from '../util';

// A note on Series.name: The series page seems to often have worse information
// than what appears on the book page. Therefore, the name is populated from
// the book extration, while this function merely collects the number of books
// in the series.
export const getSeriesInfo = asyncMemo(
  async (url: string): Promise<Omit<Series, 'name'>> => ({
    url,
    ...parse.series(await getGenericUrl(url)),
  })
);
