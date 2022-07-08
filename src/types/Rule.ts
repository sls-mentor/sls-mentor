import { ARN } from '@aws-sdk/util-arn-parser';
import { CheckResult } from './CheckResult';
import { ErrorMessages, RuleDisplayNames } from './Rules';

export interface Rule {
  ruleName: typeof RuleDisplayNames[keyof typeof RuleDisplayNames];
  errorMessage: typeof ErrorMessages[keyof typeof ErrorMessages];
  run: (resources: ARN[]) => Promise<{
    results: CheckResult[];
  }>;
}
