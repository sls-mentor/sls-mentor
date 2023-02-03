import { SlsMentorLevel } from '../constants';
import { CustomARN } from '../types/arn';
import { BaseConfiguration, RuleConfiguration } from './Configuration';

export enum Category {
  GREEN_IT = 'GREEN_IT',
  STABILITY = 'STABILITY',
  SPEED = 'SPEED',
  IT_COSTS = 'IT_COSTS',
  SECURITY = 'SECURITY',
}

export const CategoryNames = {
  [Category.GREEN_IT]: 'Green IT',
  [Category.STABILITY]: 'Stability',
  [Category.SPEED]: 'Speed',
  [Category.IT_COSTS]: 'IT costs',
  [Category.SECURITY]: 'Security',
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
