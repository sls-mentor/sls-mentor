import chalk from 'chalk';
import cliSelect from 'cli-select';

import { Stage } from '@sls-mentor/rules';

import { LILA_HEX } from 'utils';

import { Options } from '../types';
const userStagePromptValues = [
  'Development',
  'Production',
  'I want to run all checks',
];

const colorHsls = [
  [77, 89, 55],
  [64, 89, 55],
  [51, 89, 55],
  [38, 89, 55],
  [25, 89, 55],
] as const;

const stageMessagesMapping: string[] = [
  chalk.hsl(...colorHsls[0])('👍  Auditing the infra at the dev stage'),
  chalk.hsl(...colorHsls[1])('🦸‍♀️  Ohoh talking serious here'),
  chalk.hsl(...colorHsls[2])("👊  Let's goooo"),
];

const wrapStageValueInColor = (value: string) => {
  if (value === userStagePromptValues[0]) {
    return chalk.hsl(...colorHsls[0])(value);
  }
  if (value === userStagePromptValues[1]) {
    return chalk.hsl(...colorHsls[1])(value);
  }
  if (value === userStagePromptValues[2]) {
    return chalk.hsl(...colorHsls[2])(value);
  }

  return chalk.hex(LILA_HEX)(value);
};

export const promptForUserStageInput = async (): Promise<Stage | undefined> => {
  console.clear();

  console.log(
    chalk.hex(LILA_HEX)(
      'All rules are not relevant for all environments. On which environment are you running sls-mentor?\n\n',
    ),
  );

  let promptSelection;
  try {
    promptSelection = await cliSelect({
      values: userStagePromptValues,
      defaultValue: 0,
      selected: '👉',
      unselected: ' ',
      valueRenderer: (value, selected) => {
        if (selected) {
          return chalk.underline(wrapStageValueInColor(value));
        } else {
          return chalk.hex(LILA_HEX)(value);
        }
      },
    });
  } catch (e) {
    process.exit(0);
  }
  const responseNumber = Number(promptSelection.id);
  console.log(`${stageMessagesMapping[responseNumber] ?? ''} \n\n\n`);
  if (responseNumber === 2) {
    return undefined;
  }

  return responseNumber === 0 ? Stage.dev : Stage.prod;
};

export const getSlsMentorStage = async (
  cliOptions: Options,
): Promise<Stage | undefined> => {
  console.log(cliOptions);
  if (cliOptions.stage === Stage.dev) {
    return Stage.dev;
  }
  if (cliOptions.stage === Stage.prod) {
    return Stage.prod;
  }

  return await promptForUserStageInput();
};
