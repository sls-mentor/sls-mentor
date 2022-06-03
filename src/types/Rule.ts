import { CheckResult } from './CheckResult';
import { Resource } from './Resource';

export interface Rule {
  ruleName: string;
  errorMessage: string;
  run: (resources: Resource[]) => Promise<{
    results: CheckResult[];
  }>;
}
