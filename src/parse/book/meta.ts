import cheerio from 'cheerio'

function getMetaContentByAttrib(html: string) {
  const ast = cheerio.load(html)
  const meta = ast('meta').toArray()

  return (filter: Record<string, string>): string => {
    const matchingNode = meta.find(
      node => Object.entries(filter).every(([key, value]) => node.attribs[key] === value)
    )
    return matchingNode?.attribs?.content
  }
}

type MetaLookup = {
  [key: string]: {
    search: Record<string, string>
    transform?: (value: string) => any
  }
}

export interface MetaValues {
  imageUrl: string
  authorUrl: string
  isbn: number
  pageCount: number
}

export default function getMetaValues(html: string): MetaValues {
  const metaLookup: MetaLookup = {
    imageUrl: {
      search: { property: 'og:image' },
      transform: value => {
        const lastSlash = value.lastIndexOf('/')
        return value.slice(0, lastSlash) + value.slice(lastSlash).replace(/\..*.jpg/, '.jpg')
      }
    },
    authorUrl: {
      search: { property: 'books:author' }
    },
    isbn: {
      search: { property: 'books:isbn' },
      transform: parseInt
    },
    pageCount: {
      search: { property: 'books:page_count' },
      transform: parseInt
    },
  }

  const searchMetaContent = getMetaContentByAttrib(html)
  return Object.entries(metaLookup)
    .reduce((acc, [outputKey, config]) => {
      const rawValue = searchMetaContent(config.search)
      const transform = config.transform ?? ((value: string) => value)
      return ({ ...acc, [outputKey]: transform(rawValue) })
    }, {} as MetaValues)
}
