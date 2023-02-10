import { LightBundleRule } from '@sls-mentor/core';
import { describe, it } from 'vitest';

import { FAIL_LIGHT_BUNDLE_LAMBDA_NAME } from '../lib/failStack/lambda';
import { PASS_LIGHT_BUNDLE_LAMBDA_NAME } from '../lib/passStack/lambda';
import { assertResourceResult } from './utils/assertResourceResult';

const ruleName = LightBundleRule['ruleName'];

describe('lambda light bundle', () => {
  it('sls-mentor passes on lambda with small bundle', () => {
    assertResourceResult({
      ruleName,
      resourceName: PASS_LIGHT_BUNDLE_LAMBDA_NAME,
      expectedResultForResource: true,
    });
  });

  it('sls-mentor fails on lambda with huge bundle', () => {
    assertResourceResult({
      ruleName,
      resourceName: FAIL_LIGHT_BUNDLE_LAMBDA_NAME,
      expectedResultForResource: false,
    });
  });
});
