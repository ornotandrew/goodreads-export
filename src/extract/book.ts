import { getGenericUrl } from '../goodreads';
import * as parse from '../parse/book';
import { RawBook } from '../types';

export const getBookInfo = async (url: string): Promise<RawBook> => ({
  url,
  ...parse.book(await getGenericUrl(url)),
});
