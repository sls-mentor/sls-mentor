import { SLS_MENTOR_LEVELS, SlsMentorLevel } from '@sls-mentor/rules';

export const isSlsMentorLevel = (
  level: number | undefined,
): level is SlsMentorLevel =>
  SLS_MENTOR_LEVELS.includes(level as SlsMentorLevel);
