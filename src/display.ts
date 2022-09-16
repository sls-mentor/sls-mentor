import chalk from 'chalk';
import { ChecksResults, RuleDisplayNames, RuleErrorMessages } from './types';
import { getResultsByResource } from './helpers';

const displayRuleResults = (
  ruleName: string,
  successCount: number,
  totalCount: number,
): void => {
  if (totalCount === 0)
    return console.log(`${ruleName} - no resources checked`);

  const successRatio = successCount / totalCount;
  const percentage = Math.round(successRatio * 100 * 100) / 100;
  const message = `${ruleName} - ${percentage}% of resources passed (${successCount}/${totalCount})\n`;

  if (successRatio <= 0.5) return console.log(chalk.red(message));
  if (successRatio <= 0.7) return console.log(chalk.yellow(message));

  return console.log(chalk.green(message));
};

export const displayResultsSummary = (results: ChecksResults): void => {
  console.log('--- Checks summary ---\n');

  results.forEach(({ rule: { rule }, result }) => {
    const successCount = result.filter(e => e.success).length;

    displayRuleResults(RuleDisplayNames[rule], successCount, result.length);
  });
};

export const displayFailedChecksDetails = (results: ChecksResults): void => {
  console.log('--- Failed checks details ---\n');

  const resultsByResource = getResultsByResource(results);

  resultsByResource.forEach(({ resourceArn, failedRules }) => {
    const resourceNotPassingMessage = `Resource ${chalk.bold(
      resourceArn,
    )} --> ${failedRules.length} rules failed`;
    console.log(chalk.redBright(resourceNotPassingMessage));

    failedRules.forEach(({ rule: { rule }, extras }) => {
      const ruleName = RuleDisplayNames[rule];
      const errorMessage = RuleErrorMessages[rule];
      const ruleFalingMessage = `   - ${chalk.bold(ruleName)} (${chalk.grey(
        errorMessage,
      )})`;

      const extrasMessage = Object.keys(extras).reduce(
        (prev, extra) =>
          `${prev}      - ${extra} : ${extras[extra] as string}\n`,
        '',
      );
      console.log(`${ruleFalingMessage}\n${extrasMessage}`);
    });
  });
};
export const displayChecksStarting = (): void => {
  console.log(chalk.blueBright.bold('--- Running checks ---\n'));
};

export const displayError = (errorMessage: string): void => {
  console.error(`\n${chalk.redBright(errorMessage)}\n`);
};
