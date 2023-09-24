import chalk from 'chalk';

import {
  getPercentageFromPassingResources,
  PassingResourcesByRule,
} from '@sls-mentor/core';
import { allRules, RuleName } from '@sls-mentor/rules';

import { LOW_SCORE_THRESHOLD, MEDIUM_SCORE_THRESHOLD } from 'types';

const displayRuleResults = (
  ruleName: RuleName,
  successCount: number,
  totalCount: number,
): void => {
  const ruleDisplayName =
    allRules.find(rule => rule.fileName === ruleName)?.ruleName ?? 'Unknown';

  if (totalCount === 0) {
    return console.log(`${ruleDisplayName} - no resources checked\n`);
  }

  const percentage = getPercentageFromPassingResources({
    passingResourcesAmount: successCount,
    totalResourcesAmount: totalCount,
  });

  const message = `${ruleDisplayName} - ${percentage}% of resources passed (${successCount}/${totalCount})\n`;

  if (percentage <= LOW_SCORE_THRESHOLD) {
    return console.log(chalk.red(message));
  }
  if (percentage <= MEDIUM_SCORE_THRESHOLD) {
    return console.log(chalk.yellow(message));
  }

  return console.log(chalk.green(message));
};

export const displayResultsSummary = (
  results: PassingResourcesByRule,
): void => {
  console.log('--- Checks summary ---\n');

  Object.entries(results).forEach(
    ([ruleName, { totalResourcesAmount, passingResourcesAmount }]) => {
      displayRuleResults(
        ruleName as RuleName,
        passingResourcesAmount,
        totalResourcesAmount,
      );
    },
  );
};
