import { runGuardian } from '../../../src/guardian';
import { ChecksResults, Options } from '../../../src/types';

export const getGuardianResults = async (
  options: Options,
): Promise<ChecksResults> => {
  const { checksResults } = await runGuardian(options);

  return checksResults ?? [];
};
