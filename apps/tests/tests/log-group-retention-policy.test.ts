import { definedLogsRetentionDuration } from '@sls-mentor/core';
import { describe, it } from 'vitest';
import { FAIL_RETENTION_LOG_GROUP } from '../lib/failStack/logGroup';
import { PASS_RETENTION_LOG_GROUP } from '../lib/passStack/logGroup';
import { assertResourceResult } from './utils/assertResourceResult';

const ruleName = definedLogsRetentionDuration['ruleName'];

describe('log-group-retention-policy', () => {
  it('sls-mentor passes on LogGroup with specified retention policy', () => {
    assertResourceResult({
      ruleName,
      resourceName: PASS_RETENTION_LOG_GROUP,
      expectedResultForResource: true,
    });
  });

  it('sls-mentor fails on LogGroup with undefined retention policy', () => {
    assertResourceResult({
      ruleName,
      resourceName: FAIL_RETENTION_LOG_GROUP,
      expectedResultForResource: false,
    });
  });
});
