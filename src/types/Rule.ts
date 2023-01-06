import { GuardianLevel } from '../constants/level';
import { GuardianARN } from './arn';
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

export type RuleCheckResult = { arn: GuardianARN; success: boolean } & Record<
  string,
  unknown
>;
export interface Rule<T extends RuleConfiguration = BaseConfiguration> {
  ruleName: string;
  errorMessage: string;
  fileName: string;
  run: (
    resources: GuardianARN[],
    configuration?: T,
  ) => Promise<{
    results: RuleCheckResult[];
  }>;
  categories: Category[];
  level: GuardianLevel;
  configurationTypeguard?: (config: unknown) => config is T;
}
