#!/usr/bin/env node
import { program } from 'commander';
import { handleGuardianChecksCommand } from './index';

void program
  .version('0.0.1')
  .option('-s, --short', 'Short output', false)
  .action(handleGuardianChecksCommand)
  .parseAsync(process.argv);
