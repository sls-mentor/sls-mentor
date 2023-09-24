export const MAX_SLS_MENTOR_LEVEL = 5;
export const SLS_MENTOR_LEVELS = [1, 2, 3, 4, MAX_SLS_MENTOR_LEVEL] as const;
export type SlsMentorLevel = typeof SLS_MENTOR_LEVELS[number];
