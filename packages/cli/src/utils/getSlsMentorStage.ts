import { Stage } from '@sls-mentor/core/src/constants/stage';
import { Options } from 'types';
import { promptForUserStageInput } from '../display';

export const getSlsMentorStage = async (
  cliOptions: Options,
): Promise<Stage | undefined> => {
  console.log(cliOptions);
  if (cliOptions.stage === 'dev') {
    return Stage.dev;
  }
  if (cliOptions.stage === 'prod') {
    return Stage.prod;
  }
  if (cliOptions.stage === undefined) {
    return await promptForUserStageInput();
  }
  throw new Error(
    `Invalid argument of type Stage: ${
      cliOptions.stage
    }. \n --stage can only be ${Object.keys(Stage).join(', ')}`,
  );
};
