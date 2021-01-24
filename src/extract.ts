import cheerio from 'cheerio'
import { getListPage, getReview } from './goodreads'
import { DateTime } from 'luxon'

export async function getReviewIdsForPage(listId: number, page: number): Promise<{
  reviewIds: number[], progress: string, isLastPage: boolean
}> {
  const lines = (await getListPage(listId, page)).split('\n') as string[]

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

export async function getAllReviewIds(listId: number): Promise<number[]> {
  let allReviewIds = []
  let page = 1
  while (true) {
    const { reviewIds, progress, isLastPage } = await getReviewIdsForPage(listId, page)
    console.log(progress)
    allReviewIds = allReviewIds.concat(reviewIds)
    if (isLastPage) {
      break
    } else {
      page++
    }
  }

  return allReviewIds
}

export async function getReviewInfo(reviewId: number) {
  const endash = '–' // this is NOT the same as "-"
  const whitespace = '[\n\s ]'

  const html = await getReview(reviewId)
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

  const timeline = rows.reduce((acc, row) => {
    const [dateStr, description] = row.split(' - ')
    const date = DateTime.fromFormat(dateStr, 'LLLL d, yyyy').toISODate()
    return { ...acc, [date]: simplifyDescription(description) }
  }, {})

  return { timeline }
}

async function extract(listId: number): Promise<object[]> {
  const reviewIds = await getAllReviewIds(listId)
  await Promise.all(reviewIds.map(getReviewInfo))
  // await getReviewInfo(3741591694)
  return [{}]
}

export default extract
