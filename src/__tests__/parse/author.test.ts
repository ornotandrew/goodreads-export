import { getGenericUrl } from '../../goodreads';
import * as parse from '../../parse/author';
import { authorUrls as urls } from '../constants';

/* eslint-disable max-len */
describe('author', () => {
  test('Robert Jordan', async () =>
    expect(parse.author(await getGenericUrl(urls.robertJordan))).toEqual({
      name: 'Robert Jordan',
      birthDate: '1948-10-17',
      deathDate: '2007-09-16',
      genres: ['Fantasy'],
      twitterUrl: null,
      websiteUrl: null,
    }));

  test('Brandon Sanderson', async () =>
    expect(parse.author(await getGenericUrl(urls.brandonSanderson))).toEqual({
      name: 'Brandon Sanderson',
      birthDate: null,
      deathDate: null,
      genres: ['Science Fiction & Fantasy', 'Young Adult'],
      twitterUrl: 'http://www.twitter.com/BrandSanderson',
      websiteUrl: 'http://brandonsanderson.com',
    }));

  test('George Orwell', async () =>
    expect(parse.author(await getGenericUrl(urls.georgeOrwell))).toEqual({
      name: 'George Orwell',
      birthDate: '1903-06-25',
      deathDate: '1950-01-21',
      genres: ['Fiction', 'Politics', 'Journalism'],
      twitterUrl: null,
      websiteUrl: 'http://www.george-orwell.org/',
    }));
});

/* eslint-enable max-len */
