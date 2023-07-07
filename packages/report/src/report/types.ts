import { Severity } from '@sls-mentor/core';

export type Tag = Severity | 'quick-fix';

export type Recommendation = {
  ruleName: string;
  service: string;
  tags: Tag[];
};
