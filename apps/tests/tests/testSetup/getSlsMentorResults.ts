import { ChecksResults, Options, runSlsMentor } from 'sls-mentor';

export const getSlsMentorResult = async (
  options: Options,
): Promise<ChecksResults> => {
  const { checksResults } = await runSlsMentor(options);

  return checksResults ?? [];
};
