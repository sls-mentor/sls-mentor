import { CustomARN } from '@sls-mentor/arn';

export const filterIgnoredArns = <T extends CustomARN>(
  arns: T[],
  ignoredArnPatterns: string[],
): T[] =>
  arns.filter(
    arn =>
      ignoredArnPatterns.findIndex(ignoredPattern =>
        arn.toString().match(ignoredPattern),
      ) < 0,
  );
