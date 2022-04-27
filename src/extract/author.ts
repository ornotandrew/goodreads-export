import { getGenericUrl } from '../goodreads';
import * as parse from '../parse/author';
import { Author } from '../types';

export const getAuthorInfo =   async (url: string): Promise<Author> => ({
  url,
  ...parse.author(await getGenericUrl(url)),
})
;
