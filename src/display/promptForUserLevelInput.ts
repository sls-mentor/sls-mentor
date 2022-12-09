import chalk from 'chalk';
import cliSelect from 'cli-select';

const lilaHex = '#DAC2FE';

const userPromptValues = [
  'Level 1 ✅',
  'Level 2 💪',
  'Level 3 🧠',
  'Level 4 🌶️',
  'Level 5 🏆',
  '(skip)',
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
  5: chalk.hsl(...colorHsls[4]).bold('🏆  Level 5! You are a true guardian!'),
};

const wrapValueInColor = (value: string) => {
  if (value === userPromptValues[0]) return chalk.hsl(...colorHsls[0])(value);
  if (value === userPromptValues[1]) return chalk.hsl(...colorHsls[1])(value);
  if (value === userPromptValues[2]) return chalk.hsl(...colorHsls[2])(value);
  if (value === userPromptValues[3]) return chalk.hsl(...colorHsls[3])(value);
  if (value === userPromptValues[4]) return chalk.hsl(...colorHsls[4])(value);

  return chalk.hex(lilaHex)(value);
};

export const promptForUserLevelInput = async (): Promise<
  number | undefined
> => {
  console.clear();
  console.log(chalk.hex(lilaHex)('Welcome in Guardian 🛡️.\n'));
  console.log(
    chalk.hex(lilaHex)(
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
