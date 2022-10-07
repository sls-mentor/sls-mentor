import { ARN } from '@aws-sdk/util-arn-parser';
import { Category, CheckResult } from './CheckResult';

export interface Rule {
  name: string;
  displayName: string;
  errorMessage: string;
  fileName: string;
  run: (resources: ARN[]) => Promise<{
    results: CheckResult[];
  }>;
  categories: Category[];
}
