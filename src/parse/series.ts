import cheerio from 'cheerio'
import { Series } from '../types'

export function series(html: string): Omit<Series, 'url'> {
  const ast = cheerio.load(html)
  const worksText = ast('.responsiveSeriesHeader__subtitle').text().trim()
  const [, primary, total] = worksText.match(/(\d+) primary works • (\d+) total works/)

  return {
    name: ast('.responsiveSeriesHeader__title').text().trim(),
    works: {
      primary: parseInt(primary),
      total: parseInt(total),
    }
  }
}
