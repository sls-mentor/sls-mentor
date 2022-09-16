import { ARN } from '@aws-sdk/util-arn-parser';
import { CheckResult } from './CheckResult';
import { Rules } from './Rules';

export interface Rule {
  run: (resources: ARN[]) => Promise<{
    results: CheckResult[];
  }>;
  rule: Rules;
}
