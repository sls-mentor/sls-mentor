import { readFileSync } from 'fs';
import keyBy from 'lodash/keyBy';
import { ChecksResults } from '../../../src/types';

export const guardianResult = keyBy(
  JSON.parse(
    readFileSync('./tests/guardianOutput.json', 'utf8'),
  ) as ChecksResults,
  'rule.ruleName',
);
