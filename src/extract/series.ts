import { getGenericUrl } from '../goodreads'
import * as parse from '../parse/series'
import { Series } from '../types'
import { asyncMemo } from '../util'

export const getSeriesInfo = asyncMemo(async (url: string): Promise<Series> => ({
  url,
  ...parse.series(await getGenericUrl(url))
}))
