#!/usr/bin/env node
import { program } from 'commander'
import extract from './extract'

async function run(listIdString: string) {
  const listId = parseInt(listIdString, 10)
  if (isNaN(listId)) {
    console.error(`"${listIdString}" is not valid for <id>. It must be a number.`)
    process.exit(1)
  }

  const exports = await extract(listId)
  console.log(JSON.stringify(exports, null, 2))
}

program
  .arguments('<id>')
  .description('Generate an export for the given list ID')
  .action(run)
  .parseAsync(process.argv)
