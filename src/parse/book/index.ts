import cheerio from 'cheerio';
import getMetaValues from './meta';
import getDataBoxValues from './dataBox';
import { RawBook } from '../../types';
import getGenres from './genres';

type SeriesExtension = {
  positionInSeries?: number;
  series?: {
    url: string;
    name: string;
  };
};

export function book(html: string): Omit<RawBook, 'url'> {
  // Goodreads adds some of the more important fields as <meta> tags at the top
  // of the page - grab as many of these as we can with some exceptions.
  //
  // - There is a "title" field here, but we prefer to get that info from the
  //   "bookDataBox" below, since it splits the title and series.
  // - There is a "description" field here, but we prefer to get that info from
  //   the "descriptionContainer" below, since it has more text.
  const metaValues = getMetaValues(html);

  // There are more fields in a pseudo-table underneath the "Get a copy"
  // section.
  const dataBoxValues = getDataBoxValues(html);

  // The right-hand side of the page contains info about "Similar books" and
  // Genres.
  const genreHierarchy = getGenres(html);
 
  const ast = cheerio.load(html);

  // In some rare cases, the book title doesn't appear in the DataBox. However,
  // there is always an element with id=bookTitle.
  const title = ast('#bookTitle').text().trim();

  // The description appears in the meta section, but only the first 140 chars.
  // Grab the longer text instead.
  const descriptionElement = ast('#description > span').last();
  descriptionElement.find('br').replaceWith('\n');
  const description = descriptionElement.text().trim();

  // The 'series' property from the dataBox can be further broken down
  let seriesExtension: SeriesExtension = {};
  if (dataBoxValues.series) {
    const parts = dataBoxValues.series.name.split('#');
    seriesExtension = {
      positionInSeries: parseInt(parts[parts.length - 1]),
      series: {
        url: dataBoxValues.series.url,
        name: parts
          .slice(0, parts.length - 1)
          .join('#')
          .trim(),
      },
    };
  }

  return {
    title,
    description,
    ...metaValues,
    ...dataBoxValues,
    ...seriesExtension,
    genreHierarchy,
  };
}
