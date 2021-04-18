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
})

describe('individual book', () => {
  test('1984', async () => expect(parse.book(await getGenericUrl(urls['1984']))).toEqual({
    title: 'Nineteen Eighty-Four',
    authorUrl: 'https://www.goodreads.com/author/show/3706.George_Orwell',
    description: '\'It was a bright cold day in April, and the clocks were striking thirteen.\'  Winston Smith works for the Ministry of truth in London, chi...',
    imageUrl: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1327144697i/3744438.jpg',
    isbn: 9780141036144,
    pageCount: 311
  }))
})
/* eslint-enable max-len */
