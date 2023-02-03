import { describe, expect, it } from 'vitest';
import hasHeavyBundleRule from '../../../packages/sls-mentor/src/rules/lightBundle';

import { FAIL_ARM64_LAMBDA_NAME } from '../lib/failStack/lambda';
import { PASS_ARM64_LAMBDA_NAME } from '../lib/passStack/lambda';
import { slsMentorResult } from './testSetup/slsMentorResult';

const ruleName = hasHeavyBundleRule['ruleName'];

const slsMentorOutput = slsMentorResult[ruleName];

describe('lambda light bundle', () => {
  it('sls-mentor passes on lambda with small bundle', () => {
    const { result } = slsMentorOutput;
    expect(
      result.find(r => r.arn.resource.includes(PASS_ARM64_LAMBDA_NAME))
        ?.success,
    ).toBe(true);
  });

  it('sls-mentor fails on lambda sharing code with other', () => {
    const { result } = slsMentorOutput;
    expect(
      result.find(r => r.arn.resource.includes(FAIL_ARM64_LAMBDA_NAME))
        ?.success,
    ).toBe(false);
  });
});
