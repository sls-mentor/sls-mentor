import chalk from 'chalk';
import cliSelect from 'cli-select';

import { MAX_SLS_MENTOR_LEVEL, SlsMentorLevel } from '@sls-mentor/rules';

import { isSlsMentorLevel, LILA_HEX } from 'utils';

import { Options } from '../types';

const userPromptValues = [
  'Level 1 ✅',
  'Level 2 💪',
  'Level 3 🧠',
  'Level 4 🌶️',
  'Level 5 🏆',
  '(skip)',
];

const colorHsls = [
  [77, 89, 55],
  [64, 89, 55],
  [51, 89, 55],
  [38, 89, 55],
  [25, 89, 55],
] as const;

const levelMessageMapping: Record<SlsMentorLevel, string> = {
  1: chalk.hsl(...colorHsls[0])("👍  You're right, we'll start easy"),
  2: chalk.hsl(...colorHsls[1])('🦸‍♀️  You got this!'),
  3: chalk.hsl(...colorHsls[2])("👊  Let's get these resources REALLY clean.."),
  4: chalk.hsl(...colorHsls[3])(
    '🌶️  Things are getting spicy, keep up the good work!',
  ),
  5: chalk.hsl(...colorHsls[4]).bold('🏆  Level 5! You are a true mentor!'), // ??? @valentin_beggi ???
};

const wrapValueInColor = (value: string) => {
  if (value === userPromptValues[0]) {
    return chalk.hsl(...colorHsls[0])(value);
  }
  if (value === userPromptValues[1]) {
    return chalk.hsl(...colorHsls[1])(value);
  }
  if (value === userPromptValues[2]) {
    return chalk.hsl(...colorHsls[2])(value);
  }
  if (value === userPromptValues[3]) {
    return chalk.hsl(...colorHsls[3])(value);
  }
  if (value === userPromptValues[4]) {
    return chalk.hsl(...colorHsls[4])(value);
  }

  return chalk.hex(LILA_HEX)(value);
};

const promptForUserLevelInput = async (): Promise<number | undefined> => {
  console.clear();
  console.log(chalk.hex(LILA_HEX)('Welcome to sls-mentor 🛡️.\n'));
  console.log(
    chalk.hex(LILA_HEX)(
      "Let's start by selecting the level of difficulty you want me to check your code against.\n\n",
    ),
  );

  let promptSelection;
  try {
    promptSelection = await cliSelect({
      values: userPromptValues,
      defaultValue: 0,
      selected: '👉',
      unselected: ' ',
      valueRenderer: (value, selected) => {
        if (selected) {
          return chalk.underline(wrapValueInColor(value));
        } else {
          return chalk.hex(LILA_HEX)(value);
        }
      },
    });
  } catch (e) {
    process.exit(0);
  }

  const responseNumber = Number(promptSelection.id) + 1;
  const level = responseNumber === 6 ? undefined : responseNumber;

  if (isSlsMentorLevel(level)) {
    console.log(levelMessageMapping[level] + '\n\n\n');
  }

  return level;
};

export const getSlsMentorLevel = async (
  cliOptions: Options,
): Promise<SlsMentorLevel> => {
  if (cliOptions.level !== undefined) {
    const levelNumber = Number(cliOptions.level);

    if (isSlsMentorLevel(levelNumber)) {
      return levelNumber;
    }

    return MAX_SLS_MENTOR_LEVEL;
  }

  const levelPrompt = await promptForUserLevelInput();

  if (isSlsMentorLevel(levelPrompt)) {
    return levelPrompt;
  }

  return MAX_SLS_MENTOR_LEVEL;
};
