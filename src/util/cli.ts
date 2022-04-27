import { stderr as chalk } from 'chalk';
import cliProgress from 'cli-progress';

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

