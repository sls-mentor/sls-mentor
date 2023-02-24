import { Rule } from '@sls-mentor/core';

export const RULE_TAG_KEY = 'rule';

export interface Tagger {
  tagRule(rule: Rule): void;
}
