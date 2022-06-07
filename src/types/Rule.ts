import { CheckResult } from './CheckResult';
import { Resource } from './Resource';
import { ErrorMessages, RuleDisplayNames } from './Rules';

export interface Rule {
  ruleName: typeof RuleDisplayNames[keyof typeof RuleDisplayNames];
  errorMessage: typeof ErrorMessages[keyof typeof ErrorMessages];
  run: (resources: Resource[]) => Promise<{
    results: CheckResult[];
  }>;
}
