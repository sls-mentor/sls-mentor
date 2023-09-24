import { Rule } from './rule';

export const RULE_TAG_KEY = 'rule';

export interface Tagger {
  tagRule(rule: Rule): void;
}
