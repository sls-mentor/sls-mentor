import { serverSideEncryptionEnabled } from '@sls-mentor/core';
import { describe, it } from 'vitest';
import { FAIL_SSE_ENABLED_BUCKET_NAME } from '../lib/failStack/s3';
import { PASS_SSE_ENABLED_BUCKET_NAME } from '../lib/passStack/s3';
import { assertResourceResult } from './utils/assertResourceResult';

const ruleName = serverSideEncryptionEnabled['ruleName'];

describe('s3-sse-enabled', () => {
  it('sls-mentor passes on S3 bucket with SSE enable ', () => {
    assertResourceResult({
      ruleName,
      resourceName: PASS_SSE_ENABLED_BUCKET_NAME.toLowerCase(),
      expectedResultForResource: true,
    });
  });

  it('sls-mentor fails on S3 bucket with no server side encryption', () => {
    assertResourceResult({
      ruleName,
      resourceName: FAIL_SSE_ENABLED_BUCKET_NAME.toLowerCase(),
      expectedResultForResource: false,
    });
  });
});
