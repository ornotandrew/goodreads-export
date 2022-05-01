import extract from './extract.json';
import { Extract } from '../types';

const foo: Extract = extract;
console.log(foo)

export const reviewIds = {
  list: 40691268,
  reviews: {
    basic: 3741591694,
    progress: 3608220474,
    pageNumberProgress: 3710281051,
    shelvedAs: 3741589581,
    withoutStartDate: 3423938026,
  },
};

export const bookUrls = {
  lordOfChaos: 'https://www.goodreads.com/book/show/35231.Lord_of_Chaos',
  scars: 'https://www.goodreads.com/book/show/18143803-scars',
  fearToTread: 'https://www.goodreads.com/book/show/13259647-fear-to-tread',
  deliveranceLost: 'https://www.goodreads.com/book/show/10838911-deliverance-lost',
  fellowshipOfTheRing: 'https://www.goodreads.com/book/show/34.The_Fellowship_of_the_Ring',
  '1984': 'https://www.goodreads.com/book/show/3744438-1984',
  harryPotterAndTheHalfBloodPrince:
    'https://www.goodreads.com/book/show/49852.Harry_Potter_and_the_Half_Blood_Prince',
};

export const authorUrls = {
  robertJordan: 'https://www.goodreads.com/author/show/6252.Robert_Jordan',
  brandonSanderson: 'https://www.goodreads.com/author/show/38550.Brandon_Sanderson',
  georgeOrwell: 'https://www.goodreads.com/author/show/3706.George_Orwell',
};

export const seriesUrls = {
  wheelOfTime: 'https://www.goodreads.com/series/41526-the-wheel-of-time',
  farseerTrilogy: 'https://www.goodreads.com/series/41452-the-farseer-trilogy',
  horusHeresy: 'https://www.goodreads.com/series/40983-the-horus-heresy',
  lordOfTheRings: 'https://www.goodreads.com/series/66175-the-lord-of-the-rings',
};
