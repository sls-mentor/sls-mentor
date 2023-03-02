import { useIntelligentTiering } from '@sls-mentor/core';
import { describe, it } from 'vitest';
import { FAIL_INTELLIGENT_TIERING_BUCKET_NAME } from '../lib/failStack/s3';
import { PASS_INTELLIGENT_TIERING_BUCKET_NAME } from '../lib/passStack/s3';
import { assertResourceResult } from './utils/assertResourceResult';

const ruleName = useIntelligentTiering['ruleName'];

describe('s3-intelligent-tiering', () => {
  it('sls-mentor passes on S3 bucket with intelligent tiering ', () => {
    assertResourceResult({
      ruleName,
      resourceName: PASS_INTELLIGENT_TIERING_BUCKET_NAME.toLowerCase(),
      expectedResultForResource: true,
    });
  });

  it('sls-mentor fails on S3 bucket with no intelligent tiering ', () => {
    assertResourceResult({
      ruleName,
      resourceName: FAIL_INTELLIGENT_TIERING_BUCKET_NAME.toLowerCase(),
      expectedResultForResource: false,
    });
  });
});
