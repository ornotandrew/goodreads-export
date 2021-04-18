import { getGenericUrl } from '../goodreads'
import * as parse from '../parse/book'
import { RawBook } from '../types'
import { asyncMemo } from '../util'

export const getBookInfo = asyncMemo(async (url: string): Promise<RawBook> => ({
  url,
  ...parse.book(await getGenericUrl(url))
}))
