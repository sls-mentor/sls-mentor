import { describe, expect, it } from 'vitest';
import NoMonoPackageRule from '../../../packages/sls-mentor/src/rules/noMonoPackage';
import { FAIL_NO_MONO_LAMBDA_NAME } from '../lib/failStack/lambda';
import { PASS_NO_MONO_LAMBDA_NAME } from '../lib/passStack/lambda';
import { slsMentorResult } from './testSetup/slsMentorResult';

const ruleName = NoMonoPackageRule['ruleName'];

const slsMentorOutput = slsMentorResult[ruleName];

describe('lambda-arm-64', () => {
  it('sls-mentor passes on lambda sharing no code', () => {
    const { result } = slsMentorOutput;
    expect(
      result.find(r => r.arn.resource.includes(PASS_NO_MONO_LAMBDA_NAME))
        ?.success,
    ).toBe(true);
  });

  it('sls-mentor fails on lambda sharing code with other', () => {
    const { result } = slsMentorOutput;
    expect(
      result.find(r => r.arn.resource.includes(FAIL_NO_MONO_LAMBDA_NAME))
        ?.success,
    ).toBe(false);
  });
});
