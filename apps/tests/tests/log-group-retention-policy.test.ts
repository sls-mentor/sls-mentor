import { describe, expect, it } from 'vitest';
import DefinedLogsRetentionDuration from '../../../packages/sls-mentor/src/rules/definedLogsRetentionDuration';
import { FAIL_RETENTION_LOG_GROUP } from '../lib/failStack/logGroup';
import { PASS_RETENTION_LOG_GROUP } from '../lib/passStack/logGroup';
import { slsMentorResult } from './testSetup/slsMentorResult';

const ruleName = DefinedLogsRetentionDuration['ruleName'];

const slsMentorOutput = slsMentorResult[ruleName];

describe('log-group-retention-policy', () => {
  it('sls-mentor passes on LogGroup with specified retention policy', () => {
    const { result } = slsMentorOutput;
    expect(
      result.find(r => r.arn.resource.includes(PASS_RETENTION_LOG_GROUP))
        ?.success,
    ).toBe(true);
  });
  it('sls-mentor fails on LogGroup with undefined retention policy', () => {
    const { result } = slsMentorOutput;
    expect(
      result.find(r => r.arn.resource.includes(FAIL_RETENTION_LOG_GROUP))
        ?.success,
    ).toBe(false);
  });
});
