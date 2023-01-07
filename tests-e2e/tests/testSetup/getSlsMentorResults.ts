import { runSlsMentor } from '../../../src/slsMentor';
import { ChecksResults, Options } from '../../../src/types';

export const getSlsMentorResult = async (
  options: Options,
): Promise<ChecksResults> => {
  const { checksResults } = await runSlsMentor(options);

  return checksResults ?? [];
};
