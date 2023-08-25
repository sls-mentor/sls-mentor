import { Stage } from '@sls-mentor/core';
import chalk from 'chalk';
import cliSelect from 'cli-select';

const lilaHex = '#DAC2FE';

const userLevelPromptValues = [
  'Level 1 ✅',
  'Level 2 💪',
  'Level 3 🧠',
  'Level 4 🌶️',
  'Level 5 🏆',
  '(skip)',
];

const userStagePromptValues = [
  'Development',
  'Production',
  'I want to run all checks',
];

const colorHsls: [number, number, number][] = [
  [77, 89, 55],
  [64, 89, 55],
  [51, 89, 55],
  [38, 89, 55],
  [25, 89, 55],
];

const levelMessageMapping: Record<number, string> = {
  1: chalk.hsl(...colorHsls[0])("👍  You're right, we'll start easy"),
  2: chalk.hsl(...colorHsls[1])('🦸‍♀️  You got this!'),
  3: chalk.hsl(...colorHsls[2])("👊  Let's get these resources REALLY clean.."),
  4: chalk.hsl(...colorHsls[3])(
    '🌶️  Things are getting spicy, keep up the good work!',
  ),
  5: chalk.hsl(...colorHsls[4]).bold('🏆  Level 5! You are a true mentor!'), // ??? @valentin_beggi ???
};
const stageMessagesMapping: string[] = [
  chalk.hsl(...colorHsls[0])('👍  Auditing the infra at the dev stage, nice'),
  chalk.hsl(...colorHsls[1])('🦸‍♀️  Ohoh talkin serious here'),
  chalk.hsl(...colorHsls[2])("👊  Let's goooo"),
];

const wrapLevelValueInColor = (value: string) => {
  if (value === userLevelPromptValues[0])
    return chalk.hsl(...colorHsls[0])(value);
  if (value === userLevelPromptValues[1])
    return chalk.hsl(...colorHsls[1])(value);
  if (value === userLevelPromptValues[2])
    return chalk.hsl(...colorHsls[2])(value);
  if (value === userLevelPromptValues[3])
    return chalk.hsl(...colorHsls[3])(value);
  if (value === userLevelPromptValues[4])
    return chalk.hsl(...colorHsls[4])(value);

  return chalk.hex(lilaHex)(value);
};

const wrapStageValueInColor = (value: string) => {
  if (value === userStagePromptValues[0])
    return chalk.hsl(...colorHsls[0])(value);
  if (value === userStagePromptValues[1])
    return chalk.hsl(...colorHsls[1])(value);
  if (value === userStagePromptValues[2])
    return chalk.hsl(...colorHsls[2])(value);

  return chalk.hex(lilaHex)(value);
};

export const promptForUserLevelInput = async (): Promise<
  number | undefined
> => {
  console.clear();
  console.log(chalk.hex(lilaHex)('Welcome to sls-mentor 🛡️.\n'));
  console.log(
    chalk.hex(lilaHex)(
      "Let's start by selecting the level of difficulty you want me to check your code against.\n\n",
    ),
  );

  let promptSelection;
  try {
    promptSelection = await cliSelect({
      values: userLevelPromptValues,
      defaultValue: 0,
      selected: '👉',
      unselected: ' ',
      valueRenderer: (value, selected) => {
        if (selected) {
          return chalk.underline(wrapLevelValueInColor(value));
        } else {
          return chalk.hex(lilaHex)(value);
        }
      },
    });
  } catch (e) {
    process.exit(0);
  }

  const responseNumber = Number(promptSelection.id) + 1;
  const level = responseNumber === 6 ? undefined : responseNumber;
  if (level !== undefined) {
    console.log(levelMessageMapping[level] + '\n\n\n');
  }

  return level;
};

export const promptForUserStageInput = async (): Promise<Stage | undefined> => {
  console.clear();

  console.log(
    chalk.hex(lilaHex)(
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
          return chalk.hex(lilaHex)(value);
        }
      },
    });
  } catch (e) {
    process.exit(0);
  }
  const responseNumber = Number(promptSelection.id);
  console.log(stageMessagesMapping[responseNumber] + '\n\n\n');
  if (responseNumber === 2) {
    return undefined;
  }

  return responseNumber === 0 ? Stage.dev : Stage.prod;
};
