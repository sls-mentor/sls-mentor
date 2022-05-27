#!/usr/bin/env node
import { Command, InvalidArgumentError, program } from 'commander';

import { Rule, runGuardianChecks } from './index';

export type Tag = {
  key: string;
  value: string;
};
const parseTags = (value: string, previous: Tag[]): Tag[] => {
  const [{ groups }] = [
    ...value.matchAll(
      /^Key=(?<key>[\p{L}\p{Z}\p{N}_.:/=+\-@]*),Value=(?<value>[\p{L}\p{Z}\p{N}_.:/=+\-@]*)$/gu,
    ),
  ];
  if (!groups) {
    throw new InvalidArgumentError('Unvalid flag parameters');
  }

  return previous.concat([groups as Tag]);
};

export const handleGuardianChecksCommand = async (
  options: Options,
): Promise<void> => {
  process.stdout.write('Running Checks...');
  const results = await runGuardianChecks(options);
  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  console.log('Checks summary: ');

  let atLeastOneFailed = false;
  results.forEach(({ rule, result }) => {
    const successCount = result.filter(e => e.success).length;
    const failCount = result.length - successCount;

    atLeastOneFailed = atLeastOneFailed || failCount > 0;
    const successRatio = successCount / (failCount + successCount);
    const failRatio = failCount / (failCount + successCount);
    console.log(
      successRatio < 0.7
        ? '\x1b[31m'
        : successRatio < 1
        ? '\x1b[33m'
        : '\x1b[32m',
      `${rule.ruleName}:\n`,
      `[${'◼'.repeat(Math.floor(20 * successRatio))}${' '.repeat(
        Math.floor(20 * failRatio),
      )}] ${successRatio * 100}%`,
      '\x1b[0m\n',
    );
  });
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (options.short || !atLeastOneFailed)
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    process.exit(atLeastOneFailed ? 1 : 0);

  console.log('\nFailed checks details: ');
  const failedByResource: Record<string, { rule: Rule; extras: string[][] }[]> =
    {};

  results.forEach(({ rule, result }) => {
    result
      .filter(e => !e.success)
      .forEach(resourceResult => {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (failedByResource[resourceResult.arn] === undefined)
          failedByResource[resourceResult.arn] = [];
        const extraArgs = Object.keys(resourceResult)
          .filter(k => !['arn', 'success'].includes(k))
          .map(k => [k, resourceResult[k] as string]);
        failedByResource[resourceResult.arn].push({
          rule,
          extras: extraArgs,
        });
      });
  });

  Object.keys(failedByResource).forEach(ressourceArn => {
    console.error(
      '\n\x1b[47m\x1b[31m',
      `Failed checks on ressource "${ressourceArn}" :`,
      '\x1b[0m\n',
    );
    failedByResource[ressourceArn].forEach(failedCheck => {
      console.log(
        '\x1b[31m',
        `   - ${failedCheck.rule.ruleName}: ${failedCheck.rule.errorMessage}`,
        failedCheck.extras.length > 0
          ? `(${failedCheck.extras.map(e => `${e[0]}: ${e[1]}`).join(', ')})`
          : '',
        '\x1b[0m\n',
      );
    });
    //console.table(failedByResource[ressourceArn]);
  });
};

type Options = {
  awsProfile?: string | undefined;
  short: boolean;
  tags: Tag[];
  cloudformation?: string | undefined;
};

const setAwsProfile = (command: Command): void => {
  const awsProfile = command.opts<Options>().awsProfile;
  if (awsProfile !== undefined) {
    process.env.AWS_PROFILE = awsProfile;
  }
};

program
  .name('guardian')
  .version('0.0.1')
  .option('-s, --short', 'Short output', false)
  .option('-p, --aws-profile [profile]', 'AWS profile to use')
  .option('-t, --tags [key_value...]', 'Add filter tags', parseTags, [])
  .option(
    '-c, --cloudformation [cloudformation_stack_name]',
    'Only check resources from the specified CloudFormation stack name',
  )
  .action(handleGuardianChecksCommand)
  .hook('preAction', setAwsProfile)
  .parse();
