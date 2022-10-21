import { ARN } from '@aws-sdk/util-arn-parser';

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

export type RuleCheckResult = { arn: string; success: boolean } & Record<
  string,
  unknown
>;
export interface Rule {
  ruleName: string;
  errorMessage: string;
  fileName: string;
  run: (resources: ARN[]) => Promise<{
    results: RuleCheckResult[];
  }>;
  categories: Category[];
}
