#!/usr/bin/env node
import { program } from 'commander'

program.parse(process.argv)

const options = program.opts()

console.log(options)
