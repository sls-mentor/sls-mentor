import { Rule, RuleCheckResult } from '@sls-mentor/rules';

export type ChecksResults = {
  rule: Rule;
  result: RuleCheckResult[];
}[];
