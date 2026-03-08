#!/usr/bin/env node
import { stderr as chalk } from 'chalk';
import { program } from 'commander';
import extract from './extract';
import { multibar, exit } from './util/cli';
import { setCookies } from './goodreads';

async function run(listIdString: string, options: { cookies?: string }) {
  const listId = parseInt(listIdString, 10);
  if (isNaN(listId)) {
    console.error(`"${listIdString}" is not valid for <id>. It must be a number.`);
    exit();
  }

  // Set cookies if provided
  if (options.cookies) {
    setCookies(options.cookies);
  }

  try {
    const result = await extract(listId, multibar);
    multibar.stop();
    console.error(
      `${chalk.green('Done')}. Extracted ${chalk.bold(result.reviews.length)} reviews.`
    );
    console.log(JSON.stringify(result, null, 2));
  } catch (e) {
    exit(e as Error);
  }
}

process.on('SIGINT', () => exit());

program
  .option('-c, --cookies <string>', 'Cookie string from browser DevTools')
  .arguments('<id>')
  .description('Generate an export for the given list ID')
  .action(run)
  .parseAsync(process.argv);
