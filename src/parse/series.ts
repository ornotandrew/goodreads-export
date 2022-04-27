import cheerio from 'cheerio';
import { RawSeries } from '../types';

export function series(html: string): Omit<RawSeries, 'url' | 'name'> {
  const ast = cheerio.load(html);
  const worksText = ast('.responsiveSeriesHeader__subtitle').text().trim();
  const [, primary, total] = worksText.match(/(\d+)[^\d]*(\d+).*/);
  return {
    works: {
      primary: parseInt(primary),
      total: parseInt(total),
    },
  };
}
