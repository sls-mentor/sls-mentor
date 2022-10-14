import { ARN } from '@aws-sdk/util-arn-parser';
import { Category, CheckResult } from './CheckResult';
import { RuleConfiguration } from './Configuration';

export type TypeGuard<T extends RuleConfiguration> = (
  config: unknown,
) => config is T;

export interface Rule<T extends RuleConfiguration> {
  name: string;
  displayName: string;
  errorMessage: string;
  fileName: string;
  run: (resources: ARN[]) => Promise<{
    results: CheckResult[];
  }>;
  categories: Category[];
  configurationTypeGuards: TypeGuard<T>;
}
