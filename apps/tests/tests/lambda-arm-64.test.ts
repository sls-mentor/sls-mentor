import { useArm } from '@sls-mentor/core';
import { describe, it } from 'vitest';
import { FAIL_ARM64_LAMBDA_NAME } from '../lib/failStack/lambda';
import { PASS_ARM64_LAMBDA_NAME } from '../lib/passStack/lambda';
import { assertResourceResult } from './utils/assertResourceResult';

const ruleName = useArm['ruleName'];

describe('lambda-arm-64', () => {
  it('sls-mentor passes on lambda with ARM64 architecture ', () => {
    assertResourceResult({
      ruleName,
      resourceName: PASS_ARM64_LAMBDA_NAME,
      expectedResultForResource: true,
    });
  });

  it('sls-mentor fails on lambda with X86 architecture', () => {
    assertResourceResult({
      ruleName,
      resourceName: FAIL_ARM64_LAMBDA_NAME,
      expectedResultForResource: false,
    });
  });
});
