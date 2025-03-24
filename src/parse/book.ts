import cheerio from 'cheerio';
import { RawBook } from '../types';

export function book(html: string): Omit<RawBook, 'url'> {
  const ast = cheerio.load(html);
  const raw = ast('#__NEXT_DATA__').html();
  if (!raw) {
    throw new Error('Could not extract __NEXT_DATA__');
  }
  const nextData = JSON.parse(raw);
  const apolloState = nextData.props.pageProps.apolloState;
  if (!apolloState) {
    throw new Error('Could not extract apolloState');
  }
  const bookRef = Object.entries(apolloState.ROOT_QUERY)
    .filter(([k, _]) => k.startsWith('getBookByLegacyId'))
    .map(([_, v]) => (v as { __ref: string }).__ref)[0];

  const book = apolloState[bookRef];
  const author = apolloState[book.primaryContributorEdge.node.__ref];

  const seriesNode = book.bookSeries.length > 0 ? book.bookSeries[0] : null;
  const series = seriesNode ? apolloState[seriesNode.series.__ref] : null;
  const positionInSeries = parseInt(seriesNode?.userPosition);

  return {
    title: book.title,
    description: book['description({"stripped":true})'].replaceAll('\r\n', '\n'),
    authorUrl: author.webUrl,
    imageUrl: book.imageUrl,
    isbn: Number(book.details.isbn13),
    pageCount: book.details.numPages,
    genres: book.bookGenres.map((node: { genre: { name: string } }) => node.genre.name),
    positionInSeries: positionInSeries ? positionInSeries : undefined,
    series: series
      ? {
          url: series.webUrl as string,
          name: series.title as string,
        }
      : undefined,
  };
}
