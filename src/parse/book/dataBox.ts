import cheerio from 'cheerio'

type Cheerio = ReturnType<typeof cheerio.root>

interface BoxValueConfig {
  [key: string]: {
    parse: ($: Cheerio) => any,
    name: string
  }
}

const boxValueConfig: BoxValueConfig = {
  'Original Title': {
    parse: $ => $.text(),
    name: 'title'
  },
  Series: {
    parse: $ => ({
      url: `https://www.goodreads.com${$.children('a')[0].attribs.href}`,
      name: $.children('a').first().text()
    }),
    name: 'series'
  }
}

export interface DataBoxValues {
  title: string
  series?: {
    url: string
    name: string
    position?: number
  }
}

export default function getDataBoxValues(html: string): DataBoxValues {
  const ast = cheerio.load(html)
  return ast('#bookDataBox .clearFloats').toArray()
    .reduce((acc, el) => {
      const row = cheerio.load(el.children)
      const key = row('.infoBoxRowTitle').text().trim()

      const config = boxValueConfig[key]
      if (config === undefined) {
        return acc
      }

      return {
        ...acc,
        [config.name]: config.parse(row('.infoBoxRowItem'))
      }
    }, {} as DataBoxValues)
}
