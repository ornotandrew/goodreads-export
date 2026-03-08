#!/usr/bin/env node
import { stderr as chalk } from 'chalk';
import { program } from 'commander';
import extract from './extract';
import { getMultibar, exit } from './util/cli';
import { setCookies } from './goodreads';
import fs from 'fs';
import path from 'path';

async function run(listIdString: string, options: { 
  cookies?: string;
  existingExtract?: string;
}) {
  const listId = parseInt(listIdString, 10);
  if (isNaN(listId)) {
    console.error(`"${listIdString}" is not valid for <id>. It must be a number.`);
    exit();
  }

  // Set cookies if provided
  if (options.cookies) {
    setCookies(options.cookies);
  }

  // Load existing extract if provided and exists
  let existingExtract = null;
  if (options.existingExtract) {
    const extractPath = path.resolve(options.existingExtract);
    if (fs.existsSync(extractPath)) {
      try {
        const content = fs.readFileSync(extractPath, 'utf8');
        existingExtract = JSON.parse(content);
        console.error(`Loaded existing extract with ${existingExtract.reviews.length} reviews`);
      } catch (e) {
        console.error(`Warning: Failed to load existing extract: ${e}`);
      }
    }
  }

  try {
    const result = await extract(listId, getMultibar(), existingExtract);
    getMultibar()?.stop();
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
  .option('-e, --existing-extract <path>', 'Path to existing extract.json for incremental export')
  .arguments('<id>')
  .description('Generate an export for the given list ID')
  .action(run)
  .parseAsync(process.argv);
