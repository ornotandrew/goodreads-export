#!/usr/bin/env node
// import { stderr as chalk } from 'chalk';
// import { program } from 'commander';
// import extract from './extract';
// import { multibar, exit } from './util/cli';

// async function run(listIdString: string) {
//   const listId = parseInt(listIdString, 10);
//   if (isNaN(listId)) {
//     console.error(`"${listIdString}" is not valid for <id>. It must be a number.`);
//     exit();
//   }

//   try {
//     const result = await extract(listId, multibar);
//     multibar.stop();
//     console.error(
//       `${chalk.green('Done')}. Extracted ${chalk.bold(result.reviews.length)} reviews.`
//     );
//     console.log(JSON.stringify(result, null, 2));
//   } catch (e) {
//     exit(e);
//   }
// }

// process.on('SIGINT', () => exit());

// program
//   .arguments('<id>')
//   .description('Generate an export for the given list ID')
//   .action(run)
//   .parseAsync(process.argv);

import reviews from './reviews.json'
import { reviewsFromExtract } from './util/transform'

console.log(JSON.stringify(reviewsFromExtract(reviews), null, 2))
