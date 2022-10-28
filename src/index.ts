#!/usr/bin/env node
import { Command, InvalidArgumentError, program } from 'commander';
import { progressBar } from './display';

import { runGuardian } from './guardian';
import { Options, Tag } from './types';

const hasKeyAndValue = (
  groups: Record<string, string> | undefined,
): groups is Tag => {
  // ts-config is loosely assuming all keys exist, type guard to be updated when Typescript config is updated
  return groups !== undefined;
};

const parseTags = (
  tagOption: string,
  previousTags: Tag[] | undefined,
): Tag[] => {
  const [{ groups: tag }] = [
    ...tagOption.matchAll(
      /^Key=(?<key>[\p{L}\p{Z}\p{N}_.:/=+\-@]*),Value=(?<value>[\p{L}\p{Z}\p{N}_.:/=+\-@]*)$/gu,
    ),
  ];
  if (!hasKeyAndValue(tag)) {
    throw new InvalidArgumentError('Invalid flag parameters');
  }

  if (!previousTags) {
    return [tag];
  }

  return [...previousTags, tag];
};

export const handleGuardianChecksCommand = async (
  options: Options,
): Promise<void> => {
  const { success } = await runGuardian(options);
  if (success) {
    process.exit(0);
  }

  process.exit(1);
};

const setAwsProfile = (command: Command): void => {
  const awsProfile = command.opts<Options>().awsProfile;
  if (awsProfile !== undefined) {
    process.env.AWS_PROFILE = awsProfile;
  }
};

const setAwsRegion = (command: Command): void => {
  const awsRegion = command.opts<Options>().awsRegion;
  if (awsRegion !== undefined) {
    process.env.AWS_REGION = awsRegion;
  }
};

process.on('SIGINT', () => {
  progressBar.stop();
});

program
  .name('guardian')
  .version(process.env.npm_package_version ?? '0.0.0')
  .option(
    '-s, --short',
    'Short output: only display checks results overview',
    false,
  )
  .option('-p, --aws-profile <profile>', 'AWS profile to use')
  .option('-r, --aws-region <region>', 'Specify region')
  .option(
    '-t, --tags <key_value...>',
    'Filter checked account resources by tags',
    parseTags,
  )
  /** @deprecated use --cloudformation-stacks instead */
  .option(
    '--cloudformations [cloudformation-stacks...]',
    'Filter checked account resources by CloudFormation stack names',
  )
  .option(
    '-c, --cloudformation-stacks [cloudformation-stacks...]',
    'Filter checked account resources by CloudFormation stack names',
  )
  .option(
    '--noFail',
    'Exit with success status, even if some checks failed',
    false,
  )
  .action(handleGuardianChecksCommand)
  .hook('preAction', setAwsProfile)
  .hook('preAction', setAwsRegion)
  .parse();
