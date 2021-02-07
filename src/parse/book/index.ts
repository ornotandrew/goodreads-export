import getMetaValues from './meta'
import getDataBoxValues from './dataBox'

export interface Book {
  title: string
  authorUrl: string
  description: string
  imageUrl: string
  isbn: number
  pageCount: number
  seriesUrl?: string
}

export function book(html: string): Book {
  // Goodreads adds some of the more important fields as <meta> tags at the top
  // of the page - grab as many of these as we can. There is a "title" field
  // here, but we prefer to get that info from the "bookDataBox" below, since
  // it splits the title and series.
  const metaValues = getMetaValues(html)


  // There are more fields in a pseudo-table underneath the "Get a copy"
  // section.
  const dataBoxValues = getDataBoxValues(html)

  return {
    ...metaValues,
    ...dataBoxValues
  }
}
