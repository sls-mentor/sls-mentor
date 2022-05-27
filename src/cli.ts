#!/usr/bin/env node
import { program } from 'commander';
import { runGuardianChecks } from './index';

void program
  .version('0.0.1')
  .option('-p, --peppers', 'Add peppers')
  .option('-P, --pineapple', 'Add pineapple')
  .option('-b, --bbq-sauce', 'Add bbq sauce')
  .option(
    '-c, --cheese [type]',
    'Add the specified type of cheese [marble]',
    'marble',
  )
  .action(runGuardianChecks)
  .parseAsync(process.argv);
