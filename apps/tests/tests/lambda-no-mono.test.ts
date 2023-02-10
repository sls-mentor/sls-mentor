import { NoMonoPackage } from '@sls-mentor/core';
import { describe, it } from 'vitest';
import { FAIL_NO_MONO_LAMBDA_NAME } from '../lib/failStack/lambda';
import { PASS_NO_MONO_LAMBDA_NAME } from '../lib/passStack/lambda';
import { assertResourceResult } from './utils/assertResourceResult';

const ruleName = NoMonoPackage['ruleName'];

describe('lambda-arm-64', () => {
  it('sls-mentor passes on lambda sharing no code', () => {
    assertResourceResult({
      ruleName,
      resourceName: PASS_NO_MONO_LAMBDA_NAME,
      expectedResultForResource: true,
    });
  });

  it('sls-mentor fails on lambda sharing code with other', () => {
    assertResourceResult({
      ruleName,
      resourceName: FAIL_NO_MONO_LAMBDA_NAME,
      expectedResultForResource: false,
    });
  });
});
