import { describe, expect, it } from 'vitest';
import NoDefaultMemoryrule from '../../../packages/sls-mentor/src/rules/noDefaultMemory';
import { FAIL_NO_DEFAULT_MEMORY_LAMBDA_NAME } from '../lib/failStack/lambda';
import { PASS_NO_DEFAULT_MEMORY_LAMBDA_NAME } from '../lib/passStack/lambda';

import { slsMentorResult } from './testSetup/slsMentorResult';

const ruleName = NoDefaultMemoryrule['ruleName'];

const slsMentorOutput = slsMentorResult[ruleName];

describe('lambda no default memory', () => {
  it('sls-mentor passes on lambda with memory set', () => {
    const { result } = slsMentorOutput;
    expect(
      result.find(r =>
        r.arn.resource.includes(PASS_NO_DEFAULT_MEMORY_LAMBDA_NAME),
      )?.success,
    ).toBe(true);
  });

  it('sls-mentor fails on lambda with default memory', () => {
    const { result } = slsMentorOutput;
    expect(
      result.find(r =>
        r.arn.resource.includes(FAIL_NO_DEFAULT_MEMORY_LAMBDA_NAME),
      )?.success,
    ).toBe(false);
  });
});
