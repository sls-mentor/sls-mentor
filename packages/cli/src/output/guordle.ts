import chalk from 'chalk';

import {
  LOW_SCORE_THRESHOLD,
  MEDIUM_SCORE_THRESHOLD,
  PercentageByCategory,
} from 'types';

const getEmojiFromScore = (score: number) => {
  if (score > MEDIUM_SCORE_THRESHOLD) {
    return '🟩';
  }
  if (score > LOW_SCORE_THRESHOLD) {
    return '🟨';
  }

  return '🟥';
};

export const displayGuordle = (
  checksResultsByCategory: PercentageByCategory,
): void => {
  const guordle = Object.values(checksResultsByCategory)
    .map(getEmojiFromScore)
    .join('');

  console.log(
    chalk.bold(`\nShare your results on twitter: ${guordle} #sls-mentor`),
  );
};
