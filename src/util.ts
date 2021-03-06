import { stderr as chalk } from 'chalk'
import cliProgress from 'cli-progress'


export const multibar = new cliProgress.MultiBar({
  clearOnComplete: true,
  hideCursor: true,
  stream: process.stderr,
  format: [
    '{description}',
    chalk.grey('{bar}'),
    chalk.bold('{percentage}%'),
    chalk.grey('[{value}/{total}]')
  ].join(' ')
}, cliProgress.Presets.shades_classic)

export const barOptions = (description: string, emoji: string) => ({
  description: description.padEnd(15) + emoji
})

export const exit = (error?: Error) => {
  multibar.stop()
  if (error) {
    console.error(error.stack)
  }
  process.exit(1)
}

process.on('SIGINT', () => exit())

export async function batchedPromiseAll<A, R>(
  fn: (...args: A[]) => Promise<R>,
  args: A[][], batchSize: number
): Promise<R[]> {
  let position = 0
  let results = []
  while (position < args.length) {
    const argsForBatch = args.slice(position, position + batchSize)
    results = [...results, ...await Promise.all(argsForBatch.map(args => fn(...args)))]
    position += batchSize
  }
  return results
}
