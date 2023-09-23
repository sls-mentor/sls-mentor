import * as rules from './rules';

export const allRules = Object.values(rules);
export * from './types';
export * from './rules';

export type RuleName = keyof typeof rules;
