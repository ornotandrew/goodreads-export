import { getGenericUrl } from '../goodreads'
import * as parse from '../parse/author'
import { asyncMemo } from '../util'

export const getAuthorInfo = asyncMemo(async (url: string) => parse.author(await getGenericUrl(url)))
