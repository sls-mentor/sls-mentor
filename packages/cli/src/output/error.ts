import chalk from 'chalk';

export const displayError = (errorMessage: string): void => {
  console.error(`\n${chalk.redBright(errorMessage)}\n`);
};
