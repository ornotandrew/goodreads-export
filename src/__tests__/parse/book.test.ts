import { getGenericUrl } from '../../goodreads'
import * as parse from '../../parse/book'
import { bookUrls as urls } from '../constants'

/* eslint-disable max-len */
describe('part of a series', () => {
  test('Lord of Chaos', async () => expect(parse.book(await getGenericUrl(urls.lordOfChaos))).toEqual({
    title: 'Lord of Chaos',
    authorUrl: 'https://www.goodreads.com/author/show/6252.Robert_Jordan',
    description: 'In this sequel to the phenomenal New York Times bestseller The Fires of Heaven, we plunge again into Robert Jordan\'s extraordinarily rich...',
    imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1480096417i/35231.jpg',
    isbn: 9780812513752,
    pageCount: 1011,
    positionInSeries: 6,
    series: {
      url: 'https://www.goodreads.com/series/41526-the-wheel-of-time',
      name: 'The Wheel of Time'
    }
  }))

  test('Scars', async () => expect(parse.book(await getGenericUrl(urls.scars))).toEqual({
    title: 'Scars',
    authorUrl: 'https://www.goodreads.com/author/show/1001882.Chris_Wraight',
    description: 'Jaghatai Khan and his White Scars Legion must choose - the Emperor or Horus?Fresh from their conquest of Chondax and the discovery of Hor...',
    imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1376783944i/18143803.jpg',
    isbn: 9781849706049,
    pageCount: 416,
    positionInSeries: 28,
    series: {
      url: 'https://www.goodreads.com/series/40983-the-horus-heresy',
      name: 'The Horus Heresy'
    }
  }))

  test('Fear to Tread', async () => expect(parse.book(await getGenericUrl(urls.fearToTread))).toEqual({
    title: 'Fear to Tread',
    authorUrl: 'https://www.goodreads.com/author/show/32643.James_Swallow',
    description: 'Since the earliest days of the Great Crusade, Sanguinius – angelic primarch of the IXth Legion – was ever among the closest and most loya...',
    imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1332287096i/13259647.jpg',
    isbn: 9781849701969,
    pageCount: 508,
    positionInSeries: 21,
    series: {
      url: 'https://www.goodreads.com/series/40983-the-horus-heresy',
      name: 'The Horus Heresy'
    }
  }))

  test('Deliverance Lost', async () => expect(parse.book(await getGenericUrl(urls.deliveranceLost))).toEqual({
    title: 'Deliverance Lost',
    authorUrl: 'https://www.goodreads.com/author/show/46269.Gav_Thorpe',
    description: 'As the Horus Heresy divides the Imperium, Corax and his few remaining Raven Guard escape the massacre at Isstvan V. Tending to their woun...',
    imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1332438857i/10838911.jpg',
    isbn: 9781849700610,
    pageCount: 480,
    positionInSeries: 18,
    series: {
      url: 'https://www.goodreads.com/series/40983-the-horus-heresy',
      name: 'The Horus Heresy'
    }
  }), 30 * 1000)

  test('The Fellowship of the Ring', async () => expect(parse.book(await getGenericUrl(urls.fellowshipOfTheRing))).toEqual({
    title: 'The Fellowship of the Ring',
    authorUrl: 'https://www.goodreads.com/author/show/656983.J_R_R_Tolkien',
    description: 'Alternate Cover Edition ISBN 0618260269 (copyright page ISBN is 0618346252 - different from back cover)  One Ring to rule them all, One R...',
    imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1298411339i/34.jpg',
    isbn: 9780618346257,
    pageCount: 398,
    positionInSeries: 1,
    series: {
      url: 'https://www.goodreads.com/series/66175-the-lord-of-the-rings',
      name: 'The Lord of the Rings'
    }
  }))
})

describe('individual book', () => {
  test('1984', async () => expect(parse.book(await getGenericUrl(urls['1984']))).toEqual({
    title: '1984',
    authorUrl: 'https://www.goodreads.com/author/show/3706.George_Orwell',
    description: '\'It was a bright cold day in April, and the clocks were striking thirteen.\'  Winston Smith works for the Ministry of truth in London, chi...',
    imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327144697i/3744438.jpg',
    isbn: 9780141036144,
    pageCount: 311
  }))
})
/* eslint-enable max-len */
