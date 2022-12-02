import { describe, expect, it } from 'vitest';
import S3IntelligentTieringRule from '../../src/rules/useIntelligentTiering';
import { FAIL_INTELLIGENT_TIERING_BUCKET_NAME } from '../lib/failStack/s3';
import { PASS_INTELLIGENT_TIERING_BUCKET_NAME } from '../lib/passStack/s3';
import { guardianResult } from './testSetup/guardianResult';

const ruleName = S3IntelligentTieringRule['ruleName'];

const guardianOutput = guardianResult[ruleName];

describe('s3-intelligent-tiering', () => {
  it('guardian passes on S3 bucket with intelligent tiering ', () => {
    const { result } = guardianOutput;
    expect(
      result.find(r =>
        r.arn.resource.includes(
          PASS_INTELLIGENT_TIERING_BUCKET_NAME.toLowerCase(),
        ),
      )?.success,
    ).toBe(true);
  });

  it('guardian fails on S3 bucket with no intelligent tiering ', () => {
    const { result } = guardianOutput;
    expect(
      result.find(r =>
        r.arn.resource.includes(
          FAIL_INTELLIGENT_TIERING_BUCKET_NAME.toLowerCase(),
        ),
      )?.success,
    ).toBe(false);
  });
});
