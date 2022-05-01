import cheerio from 'cheerio';

export default function getGenres(html: string): string[][] {
  const $ = cheerio.load(html);
  const items = $('.bookPageGenreLink').first().parents('.bigBoxContent').html();
  if (!items) {
    return [];
  }

  return cheerio
    .load(items)('.elementList .left')
    .toArray()
    .map((el) => {
      const $leftContainer = cheerio.load(cheerio.html(el));
      return $leftContainer('a')
        .toArray()
        .map((el) => (el.children[0] as unknown as { data: string }).data);
    });
}
