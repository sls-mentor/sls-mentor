import { CustomARN } from '@sls-mentor/arn';

import { Category } from './category';
import { BaseConfiguration, RuleConfiguration } from './ruleConfiguration';
import { Service } from './service';
import { Severity } from './severityLevel';
import { SlsMentorLevel } from './slsMentorLevel';
import { Stage } from './slsMentorStage';

type RuleCheckResultAdditionalProperties = Record<string, unknown>;

export type RuleCheckResult = {
  arn: CustomARN;
  success: boolean;
} & RuleCheckResultAdditionalProperties;

export interface Rule<T extends RuleConfiguration = BaseConfiguration> {
  ruleName: string;
  errorMessage: string;
  fileName: string;
  run: (
    resources: CustomARN[],
    configuration?: T,
  ) => Promise<{
    results: RuleCheckResult[];
  }>;
  categories: Category[];
  level: SlsMentorLevel;
  stages: Stage[];
  service: Service;
  configurationTypeguard?: (config: unknown) => config is T;
  easyToFix: boolean;
  severity: Severity;
}
