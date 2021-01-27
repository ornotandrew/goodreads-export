import cheerio from 'cheerio'
import { DateTime } from 'luxon'

const endash = '–' // this is NOT the same as "-"
const whitespace = '[\n\s ]'

type ParsedReviewIds = {
  reviewIds: number[],
  progress: string,
  isLastPage: boolean
}

export function reviewIds(jsText: string): ParsedReviewIds {
  const lines = jsText.split('\n') as string[]

  // The line containing the actual HTML looks like the following:
  // Element.insert("booksBody", { bottom: "<the html>" });
  const dataLine = lines.find(l => l.startsWith('Element.insert'))
  const html = dataLine.slice(38, dataLine.length - 4)
  const ast = cheerio.load(JSON.parse(html))
  const aTags = ast('a.nobreak')
  if (aTags.length == 0) {
    console.error(ast.html().slice(0, 50) + '...')
    throw new Error('Couldn\'t find the expected HTML elements')
  }
  const reviewIds = aTags.toArray().map(e => parseInt(/\d+/.exec(e.attribs.href)[0]))

  // There's also a contextual line which looks like
  // Element.update("infiniteStatus", "60 of 131 loaded");
  const statusLine = lines.find(l => l.startsWith('Element.update'))
  const match = /(\d+) of (\d+)/.exec(statusLine)
  // const [thisIndex, totalItems] = [match[1], match[2]].map(parseInt)

  // Finally, if this is the last page, we will also have the following line
  // InfiniteScroll.isDone = true;
  const isLastPage = lines.includes('InfiniteScroll.isDone = true;')

  return { reviewIds, progress: match[0], isLastPage }
}

type ParsedReview = {
  // The key here will either be 
  // - a timeline event like 'started'
  // - a percentage like '50%'
  // - a page number (TODO)
  //
  // The value is an ISO date.
  [key: string]: string
}

export function review(html: string): ParsedReview {
  const ast = cheerio.load(html)
  const rowText = ast('.readingTimeline div.readingTimeline__row > div.readingTimeline__text').text()

  const rows = rowText
    .replace(new RegExp(`${whitespace}*${endash}${whitespace}*`, 'g'), ' - ')
    .replace(new RegExp(`${whitespace}*:${whitespace}*`, 'g'), ': ')
    .replace(/ +/g, ' ')
    .split('\n')
    .filter(s => !/^\s*$/.exec(s))

  const simplifyDescription = (goodreadsDescription: string): string => {
    const mapping = {
      'Started Reading': 'started',
      'Finished Reading': 'finished',
      'Shelved': 'shelved'
    }
    return mapping[goodreadsDescription] || goodreadsDescription
  }

  return rows.reduce((acc, row) => {
    const [dateStr, description] = row.split(' - ')
    const date = DateTime.fromFormat(dateStr, 'LLLL d, yyyy').toISODate()
    return { ...acc, [simplifyDescription(description)]: date }
  }, {})
}
