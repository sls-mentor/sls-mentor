import chalk from 'chalk';

import { ChecksResults, getPassingRulesByResource } from '@sls-mentor/core';

const getCompleteRuleErrorMessage = (
  specificMessage: string,
  fileName: string,
): string =>
  `${specificMessage}.\nSee (https://www.sls-mentor.dev/docs/rules/${fileName}) for impact and how to resolve.`;

export const displayFailedChecksDetails = (results: ChecksResults): void => {
  console.log('--- Failed checks details ---\n');

  const resultsByResource = getPassingRulesByResource(results);

  Object.entries(resultsByResource).forEach(([resourceArn, result]) => {
    const passingRules = result?.passingRules ?? [];
    const totalRules = result?.totalRules ?? [];

    const failingRules = totalRules.filter(
      rule => !passingRules.includes(rule),
    );

    if (failingRules.length === 0) {
      return;
    }

    const resourceNotPassingMessage = `Resource ${chalk.bold(
      resourceArn,
    )} --> ${failingRules.length} rules failed`;
    console.log(chalk.redBright(resourceNotPassingMessage));

    failingRules.forEach(ruleName => {
      const matchingRuleResults = results.filter(
        r => r.rule.fileName === ruleName,
      )[0];

      if (!matchingRuleResults) {
        return;
      }

      const ruleFalingMessage = `   - ${chalk.bold(
        matchingRuleResults.rule.ruleName,
      )} (${chalk.grey(
        getCompleteRuleErrorMessage(
          matchingRuleResults.rule.errorMessage,
          ruleName,
        ),
      )})`;

      const matchingResourceResult = matchingRuleResults.result.filter(
        r => r.arn.toString() === resourceArn,
      )[0];

      if (!matchingResourceResult) {
        return;
      }

      const extras = Object.fromEntries(
        Object.entries(matchingResourceResult).filter(
          ([key]) => key !== 'arn' && key !== 'success',
        ),
      );

      const extrasMessage = Object.keys(matchingResourceResult).reduce(
        (prev, extra) =>
          `${prev}      - ${extra} : ${extras[extra] as string}\n`,
        '',
      );
      console.log(`${ruleFalingMessage}\n${extrasMessage}`);
    });
  });
};
