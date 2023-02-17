import { SlsMentorLevel } from '../constants';
import { CustomARN } from '../types/arn';
import { BaseConfiguration, RuleConfiguration } from './Configuration';

export const CATEGORIES = [
  'GreenIT',
  'Stability',
  'Speed',
  'ITCosts',
  'Security',
] as const;
export type Category = (typeof CATEGORIES)[number];

export const categoryNames: Record<Category, string> = {
  GreenIT: 'Green IT',
  Stability: 'Stability',
  Speed: 'Speed',
  ITCosts: 'IT Costs',
  Security: 'Security',
};

export type RuleCheckResult = { arn: CustomARN; success: boolean } & Record<
  string,
  unknown
>;
export interface Rule<T extends RuleConfiguration = BaseConfiguration> {
  ruleName: string;
  errorMessage: string;
  fileName: string;
  run: (
    resources: CustomARN[],
    configuration?: T,
  ) => Promise<{
    results: RuleCheckResult[];
  }>;
  categories: Category[];
  level: SlsMentorLevel;
  configurationTypeguard?: (config: unknown) => config is T;
}
