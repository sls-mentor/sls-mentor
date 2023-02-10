import { NoDefaultMemory } from '@sls-mentor/core';
import { describe, it } from 'vitest';
import { FAIL_NO_DEFAULT_MEMORY_LAMBDA_NAME } from '../lib/failStack/lambda';
import { PASS_NO_DEFAULT_MEMORY_LAMBDA_NAME } from '../lib/passStack/lambda';
import { assertResourceResult } from './utils/assertResourceResult';

const ruleName = NoDefaultMemory['ruleName'];

describe('lambda no default memory', () => {
  it('sls-mentor passes on lambda with memory set', () => {
    assertResourceResult({
      ruleName,
      resourceName: PASS_NO_DEFAULT_MEMORY_LAMBDA_NAME,
      expectedResultForResource: true,
    });
  });

  it('sls-mentor fails on lambda with default memory', () => {
    assertResourceResult({
      ruleName,
      resourceName: FAIL_NO_DEFAULT_MEMORY_LAMBDA_NAME,
      expectedResultForResource: false,
    });
  });
});
