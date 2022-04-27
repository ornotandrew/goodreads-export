import { getGenericUrl } from '../goodreads';
import * as parse from '../parse/author';
import { RawAuthor } from '../types';

export const getAuthorInfo =   async (url: string): Promise<RawAuthor> => ({
  url,
  ...parse.author(await getGenericUrl(url)),
})
;
