import { Rules } from './Rules';
import { Rule } from './Rule';

export type CheckResult = { arn: string; success: boolean } & Record<
  string,
  unknown
>;

export type ChecksResults = {
  rule: Rule;
  result: CheckResult[];
}[];

export type FailedRule = {
  rule: Rule;
  extras: Record<string, unknown>;
};

export type ResourceResult = {
  resourceArn: string;
  failedRules: FailedRule[];
};

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

export const RulesCategories: Record<Rules, Category[]> = {
  [Rules.ASYNC_SPECIFY_FAILURE_DESTINATION]: [Category.STABILITY],
  [Rules.INTELLIGENT_TIERING]: [Category.GREEN_IT, Category.IT_COSTS],
  [Rules.LIGHT_BUNDLE]: [Category.GREEN_IT, Category.STABILITY],
  [Rules.LIMITED_AMOUNT_OF_LAMBDA_VERSIONS]: [
    Category.GREEN_IT,
    Category.STABILITY,
  ],
  [Rules.NO_DEFAULT_MEMORY]: [Category.GREEN_IT, Category.IT_COSTS],
  [Rules.NO_IDENTICAL_CODE]: [Category.SECURITY, Category.STABILITY],
  [Rules.NO_MAX_TIMEOUT]: [
    Category.GREEN_IT,
    Category.IT_COSTS,
    Category.STABILITY,
  ],
  [Rules.NO_SHARED_IAM_ROLES]: [Category.SECURITY, Category.STABILITY],
  [Rules.SPECIFY_DLQ_ON_SQS]: [Category.STABILITY],
  [Rules.UNDER_MAX_MEMORY]: [Category.GREEN_IT, Category.IT_COSTS],
  [Rules.USE_ARM_ARCHITECTURE]: [
    Category.GREEN_IT,
    Category.IT_COSTS,
    Category.SPEED,
  ],
};

export type ChecksResultsByCategory = Record<Category, number>;
