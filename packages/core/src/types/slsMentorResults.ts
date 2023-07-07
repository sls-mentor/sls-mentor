import { SlsMentorLevel } from '../constants';
import { Severity } from './Rule';

export type RuleResults = Record<
  string,
  { passingResources: number; totalResources: number }
>;

export type Tag = Severity | 'quick-fix';

export type Recommendation = {
  ruleName: string;
  service: string;
  tags: Tag[];
};

export type SlsMentorResults = {
  results: RuleResults;
  level: SlsMentorLevel;
};
