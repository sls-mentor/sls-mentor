import chalk from 'chalk';
import { Progress } from 'clui';
import { ChecksResults } from './types';
import { getResultsByResource } from './helpers';

const displayRulePassingPercentage = (
  ruleName: string,
  ratio: number,
): void => {
  const percentage = Math.round(ratio * 100 * 100) / 100;
  const message = `${ruleName} - ${percentage}% of resources passed\n`;

  if (ratio <= 0.5) return console.log(chalk.red(message));
  if (ratio <= 0.7) return console.log(chalk.yellow(message));

  return console.log(chalk.green(message));
};

export const displayResultsSummary = (results: ChecksResults): void => {
  console.log('--- Checks summary ---\n');

  results.forEach(({ rule, result }) => {
    const successCount = result.filter(e => e.success).length;
    const successRatio = result.length === 0 ? 1 : successCount / result.length;
    displayRulePassingPercentage(rule.ruleName, successRatio);
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
