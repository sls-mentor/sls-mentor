import { describe, expect, it } from 'vitest';
import UseArmRule from '../../src/rules/useArm';
import { FAIL_ARM64_LAMBDA_NAME } from '../lib/failStack/lambda';
import { PASS_ARM64_LAMBDA_NAME } from '../lib/passStack/lambda';
import { guardianResult } from './testSetup/guardianResult';

const ruleName = UseArmRule['ruleName'];

const guardianOutput = guardianResult[ruleName];

describe('lambda-arm-64', () => {
  it('guardian passes on lambda with ARM64 architecture ', () => {
    const { result } = guardianOutput;
    expect(
      result.find(r => r.arn.resource.includes(PASS_ARM64_LAMBDA_NAME))
        ?.success,
    ).toBe(true);
  });

  it('guardian fails on lambda with X86 architecture', () => {
    const { result } = guardianOutput;
    expect(
      result.find(r => r.arn.resource.includes(FAIL_ARM64_LAMBDA_NAME))
        ?.success,
    ).toBe(false);
  });
});
