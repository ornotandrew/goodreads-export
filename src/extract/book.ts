import { getGenericUrl } from '../goodreads';
import * as parse from '../parse/book';
import { RawBook } from '../types';

export const getBookInfo = async (url: string): Promise<RawBook> => ({
  url,
  ...parse.book(await getGenericUrl(url)),
});

const urlFromGenreName = (name: string) =>
  'https://www.goodreads.com/genres/' + name.toLowerCase().replaceAll(' ', '-');

export const genreUrls = (booksByUrl: Record<string, RawBook>) => {
  const uniqueGenres = [
    ...new Set(
      Object.values(booksByUrl)
        .map((book) => book.genreHierarchy.flat())
        .flat()
    ),
  ];

  return uniqueGenres.reduce((acc, name) => ({ ...acc, [name]: urlFromGenreName(name) }), {} as Record<string, string>);
};
