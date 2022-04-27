import { getGenericUrl } from '../goodreads';
import * as parse from '../parse/series';
import { RawBook, RawSeries } from '../types';
import { indexBy } from '../util';

// A note on Series.name: The series page seems to often have worse information
// than what appears on the book page. Therefore, the name is populated from
// the book extration, while this function merely collects the number of books
// in the series.
type RawSeriesWithoutName = Omit<RawSeries, 'name'>;

export const getSeriesInfo = async (url: string): Promise<RawSeriesWithoutName> => ({
  url,
  ...parse.series(await getGenericUrl(url)),
});

export const attachSeriesName = (
  seriesByUrl: Record<string, RawSeriesWithoutName>,
  booksByUrl: Record<string, RawBook>
): Record<string, RawSeries> => {
  const booksBySeriesUrl = indexBy(
    Object.values(booksByUrl).filter((x) => !!x.series),
    (book) => book.series!.url
  );

  const withName = Object.values(seriesByUrl).map((series) => ({
    ...series,
    name: booksBySeriesUrl[series.url].series!.name,
  }));

  return indexBy(withName, series => series.url)
};
