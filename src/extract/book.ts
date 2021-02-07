import { getBook } from '../goodreads'
import * as parse from '../parse/book'

export async function getBookInfo(url: string) {
  return parse.book(await getBook(url))
}
