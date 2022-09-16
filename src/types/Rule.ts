import { ARN } from '@aws-sdk/util-arn-parser';
import { CheckResult } from './CheckResult';

export interface Rule {
  ruleName: string;
  errorMessage: string;
  fileName: string;
  run: (resources: ARN[]) => Promise<{
    results: CheckResult[];
  }>;
}
