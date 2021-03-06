import { getBook } from '../goodreads'
import * as parse from '../parse/book'
import { asyncMemo } from '../util'

export const getBookInfo = asyncMemo(async (url: string) => parse.book(await getBook(url)))
