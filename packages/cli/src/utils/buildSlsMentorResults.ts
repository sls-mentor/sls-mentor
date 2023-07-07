import { SlsMentorLevel, SlsMentorResults } from '@sls-mentor/core';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'path';
import { ChecksResults } from 'types';
import { REPORT_OUTPUT_FOLDER, REPORT_OUTPUT_PATH } from '../constants';

const TEMPLATE_PATH = '../../template/index.html';

const PLACEHOLDER = '<<SLS-RESULTS-PLACEHOLDER>>';

export const buildSlsMentorResults = (
  checksResults: ChecksResults,
  level: SlsMentorLevel,
): SlsMentorResults => {
  const results = Object.fromEntries(
    checksResults.map(({ result, rule: { fileName } }) => {
      const passingResources = result.filter(({ success }) => success).length;
      const totalResources = result.length;

      return [fileName, { passingResources, totalResources }];
    }),
  );

  return { results, level };
};

export const saveReport = (
  checksResults: ChecksResults,
  level: SlsMentorLevel,
): void => {
  const reportInput = buildSlsMentorResults(checksResults, level);
  const data = JSON.stringify(reportInput).replace(/"/g, '\\"');

  const template = readFileSync(path.join(__dirname, TEMPLATE_PATH)).toString();

  const report = template.replace(PLACEHOLDER, data);

  const reportFolderExists = existsSync(REPORT_OUTPUT_FOLDER);

  if (!reportFolderExists) {
    mkdirSync(REPORT_OUTPUT_FOLDER);
  }

  writeFileSync(REPORT_OUTPUT_PATH, report);
};
