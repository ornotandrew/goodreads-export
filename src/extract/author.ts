import { getGenericUrl } from '../goodreads';
import * as parse from '../parse/author';
import { Author } from '../types';
import { asyncMemo } from '../util';

export const getAuthorInfo = asyncMemo(
  async (url: string): Promise<Author> => ({
    url,
    ...parse.author(await getGenericUrl(url)),
  })
);
