import chalk from 'chalk';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import {
  ChecksResults,
  getPassingResourcesByCategory,
  getPassingResourcesByRule,
} from '@sls-mentor/core';

import { LILA_HEX } from 'utils';

const TEMPLATE_PATH =
  process.env.STAGE === 'dev'
    ? '../../../report/dist/index.html'
    : './template/index.html';

const PLACEHOLDER = '<<SLS-RESULTS-PLACEHOLDER>>';

const REPORT_OUTPUT_FOLDER = './.sls-mentor';
const REPORT_OUTPUT_PATH = `${REPORT_OUTPUT_FOLDER}/index.html`;

export const saveReport = (checksResults: ChecksResults): void => {
  const reportInput = {
    passingResourcesByRule: getPassingResourcesByRule(checksResults),
    passingResourcesByCategory: getPassingResourcesByCategory(checksResults),
  };

  const data = JSON.stringify(reportInput).replace(/"/g, '\\"');

  const template = readFileSync(join(__dirname, TEMPLATE_PATH)).toString();

  const report = template.replace(PLACEHOLDER, data);

  const reportFolderExists = existsSync(REPORT_OUTPUT_FOLDER);

  if (!reportFolderExists) {
    mkdirSync(REPORT_OUTPUT_FOLDER);
  }

  writeFileSync(REPORT_OUTPUT_PATH, report);

  console.log(chalk.hex(LILA_HEX)('\n\n ⬇️  [NEW!] Report generated to ⬇️\n'));
  console.log(chalk.hex(LILA_HEX)(REPORT_OUTPUT_PATH));
};
