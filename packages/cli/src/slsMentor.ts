/* eslint-disable complexity */
import { CustomARN, SlsMentorLevel } from '@sls-mentor/core';
import chalk from 'chalk';
import { Spinner } from 'cli-spinner';
import { saveReport } from './utils/buildSlsMentorResults';
import { runChecks } from './checks';
import { readConfiguration } from './configuration/utils/readConfiguration';
import { LILA_HEX, REPORT_OUTPUT_PATH } from './constants';
import {
  displayDashboard,
  displayError,
  displayFailedChecksDetails,
  displayGuordle,
  displayResultsSummary,
} from './display';
import { fetchAllResourceArns, initAccountAndRegion } from './init';
import { getResultsByCategory } from './results/getResultsByCategory';

import { ChecksResults, Options } from './types';
import { getSlsMentorLevel } from './utils/getSlsMentorLevel';

export const runSlsMentor = async (
  options: Options,
): Promise<{ success: boolean; checksResults?: ChecksResults }> => {
  const configuration = readConfiguration();
  const level = await getSlsMentorLevel(options);

  const connectionSpinner = new Spinner({
    text: chalk.hex(LILA_HEX)('%s Connecting to AWS...'),

    onTick: function (msg) {
      this.clearLine(this.stream);
      this.stream.write(msg);
    },
  });
  connectionSpinner.setSpinnerString('⠇⠋⠙⠸⠴⠦');
  connectionSpinner.start();

  await initAccountAndRegion();

  connectionSpinner.stop(true);

  let allResourcesArns: CustomARN[];
  try {
    allResourcesArns = await fetchAllResourceArns({
      cloudformationStacks:
        options.cloudformationStacks ?? options.cloudformations,
      tags: options.tags,
    });
  } catch {
    const profile = process.env.AWS_PROFILE;
    if (profile !== undefined) {
      displayError(
        `Unable to fetch AWS resources, check that profile "${profile}" is correctly set and has the needed rights or specify another profile using -p option`,
      );

      return { success: false };
    }

    displayError(
      `Unable to fetch AWS resources, check that your default profile is correctly set and has the needed rights or that you have correctly set environment variables`,
    );

    return { success: false };
  }

  const checksResults = await runChecks(
    allResourcesArns,
    level,
    configuration.rules,
  );

  const atLeastOneFailed = checksResults.some(
    ({ result }) => result.filter(resource => !resource.success).length > 0,
  );

  if (!options.short && atLeastOneFailed) {
    displayFailedChecksDetails(checksResults);
  }

  displayResultsSummary(checksResults);
  const resultsByCategory = getResultsByCategory(checksResults);
  displayDashboard(resultsByCategory);
  displayGuordle(resultsByCategory);

  if (options.report) {
    saveReport(checksResults, level as SlsMentorLevel);
    console.log(
      chalk.hex(LILA_HEX)('\n\n ⬇️  [NEW!] Report generated to ⬇️\n'),
    );
    console.log(chalk.hex(LILA_HEX)(REPORT_OUTPUT_PATH));
  }

  return {
    success: options.noFail || !atLeastOneFailed,
    ...(options.getJsonResults === true ? { checksResults } : {}),
  };
};
