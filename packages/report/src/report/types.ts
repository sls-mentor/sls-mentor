import { Severity } from '@sls-mentor/rules';

export type Tag = Severity | 'quick-fix';

export type Recommendation = {
  ruleName: string;
  service: string;
  tags: Tag[];
};
