import cheerio from 'cheerio';
import { DateTime } from 'luxon';
import { RawAuthor } from '../types';

// TODO: just pass the AST in directly (once cheerio exports the correct type)
function getTable(html: string): Record<string, string> {
  const ast = cheerio.load(html);

  const table = {};
  let lastKey = null;

  ast('div.rightContainer > div.dataTitle, div.rightContainer > div.dataItem').each((_, child) => {
    const elem = ast(child);
    if (elem.hasClass('dataTitle')) {
      lastKey = elem.text();
      table[lastKey] = null;
    }
    if (elem.hasClass('dataItem')) {
      // if there's an _external_ link inside the div, take the value from that instead
      const anchor = elem.children('a');
      const hasExternalHref = anchor && anchor.attr('href')?.startsWith('http');
      table[lastKey] = hasExternalHref ? anchor.attr('href') : elem.text().trim();
    }
  });

  return table;
}

export function author(html: string): Omit<RawAuthor, 'url'> {
  const ast = cheerio.load(html);
  const name = ast('h1.authorName span[itemprop="name"]').text().trim();

  const table = getTable(html);
  const parseDate = (dateStr: string) =>
    dateStr ? DateTime.fromFormat(dateStr, 'LLLL d, yyyy').toISODate() : null;

  return {
    name,
    birthDate: parseDate(table.Born),
    deathDate: parseDate(table.Died),
    genres: table.Genre?.split(', '),
    websiteUrl: table?.Website,
    twitterUrl: table?.Twitter,
  };
}
