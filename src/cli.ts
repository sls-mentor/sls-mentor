#!/usr/bin/env node
import { Command, InvalidArgumentError, program } from 'commander';

import { runGuardianChecks } from './index';
import { displayChecksStarting, displayResults } from './display';
import { Options, Tag } from './types/CliOptions';

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
  displayChecksStarting();
  const results = await runGuardianChecks(options);
  displayResults(results, options);
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

program
  .name('guardian')
  .version(process.env.npm_package_version ?? '0.0.0')
  .option('-s, --short', 'Short output', false)
  .option('-p, --aws-profile <profile>', 'AWS profile to use')
  .option('-r, --aws-region <region>', 'Specify region')
  .option('-t, --tags <key_value...>', 'Add filter tags', parseTags)
  .option(
    '-c, --cloudformation <cloudformation_stack_name>',
    'Only check resources from the specified CloudFormation stack name',
  )
  .action(handleGuardianChecksCommand)
  .hook('preAction', setAwsProfile)
  .hook('preAction', setAwsRegion)
  .parse();
