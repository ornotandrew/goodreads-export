import cheerio from 'cheerio'
import { Series } from '../types'

export function series(html: string): Omit<Series, 'url' | 'name'> {
  const ast = cheerio.load(html)
  const worksText = ast('.responsiveSeriesHeader__subtitle').text().trim()
  const [, primary, total] = worksText.match(/(\d+) primary works • (\d+) total works/)

  return {
    works: {
      primary: parseInt(primary),
      total: parseInt(total),
    }
  }
}
