import chalk from 'chalk';
import { Progress } from 'clui';
import { ChecksResults } from './types';
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

  results.forEach(({ rule, result }) => {
    const successCount = result.filter(e => e.success).length;

    displayRuleResults(rule.ruleName, successCount, result.length);
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

    failedRules.forEach(({ rule, extras }) => {
      const ruleFalingMessage = `   - ${chalk.bold(
        rule.ruleName,
      )} (${chalk.grey(rule.errorMessage)})`;

      const extrasMessage = Object.keys(extras).reduce(
        (prev, extra) =>
          `${prev}      - ${extra} : ${extras[extra] as string}\n`,
        '',
      );
      console.log(`${ruleFalingMessage}\n${extrasMessage}`);
    });
  });
};

export const displayProgress = (rate: number): void => {
  console.log(new Progress(50).update(rate));
};

export const displayChecksStarting = (): void => {
  console.log(chalk.blueBright.bold('--- Running checks ---\n'));
};
