#!/usr/bin/env node
import { InvalidArgumentError, program } from 'commander';

import { handleGuardianChecksCommand } from './index';

export type Tag = {
  key: string;
  value: string;
};
const parseTags = (value: string, previous: Tag[]): Tag[] => {
  const [{ groups }] = [
    ...value.matchAll(
      /^Key=(?<key>[\p{L}\p{Z}\p{N}_.:/=+\-@]*),Value=(?<value>[\p{L}\p{Z}\p{N}_.:/=+\-@]*)$/gu,
    ),
  ];
  if (!groups) {
    throw new InvalidArgumentError('Unvalid flag parameters');
  }

  return previous.concat([groups as Tag]);
};

void program
  .version('0.0.1')
  .option('-s, --short', 'Short output', false)
  .option('-t, --tags [key_value...]', 'Add filter tags', parseTags, [])
  .action(handleGuardianChecksCommand)
  .parseAsync(process.argv);
