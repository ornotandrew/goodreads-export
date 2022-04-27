import { stderr as chalk } from 'chalk';
import cliProgress from 'cli-progress';
import { RawReview } from './types';

export const multibar = new cliProgress.MultiBar(
  {
    clearOnComplete: true,
    hideCursor: true,
    stream: process.stderr,
    format: [
      '{description}',
      chalk.grey('{bar}'),
      chalk.bold('{percentage}%'),
      chalk.grey('[{value}/{total}]'),
    ].join(' '),
  },
  cliProgress.Presets.shades_classic
);

export const barOptions = (description: string, emoji: string) => ({
  description: description.padEnd(15) + emoji,
});

export const exit = (error?: Error) => {
  multibar.stop();
  if (error) {
    console.error(error.stack);
  }
  process.exit(1);
};

process.on('SIGINT', () => exit());

export async function batchedPromiseAll<A, R>(
  fn: (...args: A[]) => Promise<R>,
  args: A[][],
  batchSize: number
): Promise<R[]> {
  let position = 0;
  let results = [];
  while (position < args.length) {
    const argsForBatch = args.slice(position, position + batchSize);
    results = [...results, ...(await Promise.all(argsForBatch.map((args) => fn(...args))))];
    position += batchSize;
  }
  return results;
}

export function indexBy<T, K extends string | number>(
  items: Array<T>,
  getIndex: (item: T) => K
): Record<K, T> {
  return items.reduce((acc, item) => ({ ...acc, [getIndex(item)]: item }), {} as Record<K, T>);
}

export const unique = <T, K>(items: T[], getIndex: (item: T) => K) => [
  ...new Set(items.map(getIndex)),
];

export const mostRecentlyStarted = (a: RawReview, b: RawReview) => {
  // If neither of the books have been started, compare their shelved dates
  if (!a.timeline.started && !b.timeline.started) {
    return a.timeline.shelved.localeCompare(b.timeline.shelved);
  }

  // Otherwise, started books always appear before "un"started books

  if (!a.timeline.started && b.timeline.started) {
    return 1;
  }

  if (a.timeline.started && !b.timeline.started) {
    return -1;
  }

  // Started books are ordered by most-recently-started first

  return a.timeline.shelved.localeCompare(b.timeline.shelved);
};
