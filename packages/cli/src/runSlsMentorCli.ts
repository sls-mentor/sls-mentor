import {
  getOverallPercentage,
  getPassingResourcesByCategory,
  getPassingResourcesByRule,
  getPercentageFromPassingResources,
  runSlsMentor,
} from '@sls-mentor/core';
import { CATEGORIES } from '@sls-mentor/rules';

import { getSlsMentorLevel, getSlsMentorStage, readConfiguration } from 'input';
import {
  displayDashboard,
  displayError,
  displayFailedChecksDetails,
  displayGuordle,
  displayResultsSummary,
  getHooks,
  saveReport,
} from 'output';
import { Options, PercentageByCategory } from 'types';

export const runSlsMentorCli = async (options: Options): Promise<void> => {
  const configuration = readConfiguration();
  const level = await getSlsMentorLevel(options);
  const stage = await getSlsMentorStage(options);
  const hooks = getHooks();

  const result = await runSlsMentor({
    configuration,
    level,
    stage,
    cloudformationStacks:
      options.cloudformationStacks ?? options.cloudformations,
    tags: options.tags,
    profile: options.awsProfile,
    region: options.awsRegion,
    debug: options.debug,
    hooks,
  });

  if (result.error) {
    displayError(result.message);
    displayError('If you need more details, try to run with --debug');
    process.exit(1);
  }

  const { success, checksResults } = result;

  const passingResourcesByRule = getPassingResourcesByRule(checksResults);
  const passingResourcesByCategory =
    getPassingResourcesByCategory(checksResults);
  const percentageByCategory = Object.fromEntries(
    CATEGORIES.map(category => [
      category,
      getPercentageFromPassingResources(passingResourcesByCategory[category]),
    ]),
  ) as PercentageByCategory;
  const overallPercentage = getOverallPercentage(passingResourcesByRule);

  if (!options.short && !success) {
    displayFailedChecksDetails(checksResults);
  }

  displayResultsSummary(passingResourcesByRule);
  displayDashboard(percentageByCategory, overallPercentage);
  displayGuordle(percentageByCategory);

  if (options.report) {
    saveReport(checksResults);
  }

  if (success) {
    process.exit(0);
  }

  process.exit(1);
};
