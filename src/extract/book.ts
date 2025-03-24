import { getGenericUrl } from '../goodreads';
import * as parse from '../parse/book';
import { RawBook } from '../types';

export const getBookInfo = async (url: string): Promise<RawBook> => {
  if (!url) {
    console.log(`bookInfoURL is missing! ${url}`);
  }
  return {
    url,
    ...parse.book(await getGenericUrl(url)),
  };
};
