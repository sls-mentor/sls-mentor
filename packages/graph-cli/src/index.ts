import { Command, InvalidArgumentError, program } from 'commander';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

import { generateGraph, serializeGraphData } from '@sls-mentor/graph-core';

type Options = {
  awsProfile?: string;
  awsRegion?: string;
  cloudformationStacks?: string[];
  tags?: Tag[];
};

type Tag = {
  key: string;
  value: string;
};

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
  const matches = [
    ...tagOption.matchAll(
      /^Key=(?<key>[\p{L}\p{Z}\p{N}_.:/=+\-@]*),Value=(?<value>[\p{L}\p{Z}\p{N}_.:/=+\-@]*)$/gu,
    ),
  ];

  const tag = matches[0]?.groups;

  if (!hasKeyAndValue(tag)) {
    throw new InvalidArgumentError('Invalid flag parameters');
  }

  if (!previousTags) {
    return [tag];
  }

  return [...previousTags, tag];
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

const TEMPLATE_PATH =
  process.env.STAGE === 'dev'
    ? '../../graph-front/dist/index.html'
    : './template/index.html';

const PLACEHOLDER = '<<SLS-RESULTS-PLACEHOLDER>>';

const REPORT_OUTPUT_FOLDER = './.sls-mentor-graph';
const REPORT_OUTPUT_PATH = `${REPORT_OUTPUT_FOLDER}/index.html`;

const run = async (options: Options): Promise<void> => {
  const result = await generateGraph({
    tags: options.tags,
    cloudformationStacks: options.cloudformationStacks,
  });

  const serializedResult = serializeGraphData(result);

  writeFileSync(
    './raw.json',
    JSON.stringify(serializedResult, null, 2),
    'utf-8',
  );

  const data = JSON.stringify(result).replace(/"/g, '\\"');

  const template = readFileSync(join(__dirname, TEMPLATE_PATH)).toString();

  const report = template.replace(PLACEHOLDER, data);

  const reportFolderExists = existsSync(REPORT_OUTPUT_FOLDER);

  if (!reportFolderExists) {
    mkdirSync(REPORT_OUTPUT_FOLDER);
  }

  writeFileSync(REPORT_OUTPUT_PATH, report);

  console.log('Report generated to ⬇️');
  console.log(REPORT_OUTPUT_PATH);

  return Promise.resolve();
};

program
  .name('sls-mentor')
  .version(process.env.npm_package_version ?? '0.0.0')
  .option('-p, --aws-profile <profile>', 'AWS profile to use')
  .option('-r, --aws-region <region>', 'Specify region')
  .option(
    '-t, --tags <key_value...>',
    'Filter checked account resources by tags',
    parseTags,
  )
  .option(
    '-c, --cloudformation-stacks [cloudformation-stacks...]',
    'Filter checked account resources by CloudFormation stack names',
  )
  .action(run)
  .hook('preAction', setAwsProfile)
  .hook('preAction', setAwsRegion)
  .parse();
