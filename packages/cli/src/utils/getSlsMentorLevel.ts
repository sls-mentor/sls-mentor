import { MAX_SLS_MENTOR_LEVEL } from '@sls-mentor/core';
import { promptForUserLevelInput } from '../display/promptForUserInput';
import { Options } from '../types';

export const getSlsMentorLevel = async (
  cliOptions: Options,
): Promise<number> => {
  if (cliOptions.level !== undefined) {
    const levelNumber = Number(cliOptions.level);

    if (levelNumber > MAX_SLS_MENTOR_LEVEL || levelNumber < 1) {
      return MAX_SLS_MENTOR_LEVEL;
    }

    return levelNumber;
  }

  const levelPrompt = await promptForUserLevelInput();

  return levelPrompt ?? MAX_SLS_MENTOR_LEVEL;
};
