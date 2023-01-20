import { runSlsMentor } from '../../../../packages/sls-mentor/src/slsMentor';
import {
  ChecksResults,
  Options,
} from '../../../../packages/sls-mentor/src/types';

export const getSlsMentorResult = async (
  options: Options,
): Promise<ChecksResults> => {
  const { checksResults } = await runSlsMentor(options);

  return checksResults ?? [];
};
