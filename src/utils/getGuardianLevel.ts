import { MAX_GUARDIAN_LEVEL } from '../constants/level';
import { promptForUserLevelInput } from '../display/promptForUserLevelInput';
import { Options } from '../types';

export const getGuardianLevel = async (
  cliOptions: Options,
): Promise<number> => {
  if (cliOptions.level !== undefined) {
    const levelNumber = Number(cliOptions.level);

    if (levelNumber > MAX_GUARDIAN_LEVEL || levelNumber < 1) {
      return MAX_GUARDIAN_LEVEL;
    }

    return levelNumber;
  }

  const levelPrompt = await promptForUserLevelInput();

  return levelPrompt ?? MAX_GUARDIAN_LEVEL;
};
