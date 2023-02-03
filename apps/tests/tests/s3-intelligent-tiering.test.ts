import { UseIntelligentTiering as S3IntelligentTieringRule } from 'core';
import { describe, expect, it } from 'vitest';
import { FAIL_INTELLIGENT_TIERING_BUCKET_NAME } from '../lib/failStack/s3';
import { PASS_INTELLIGENT_TIERING_BUCKET_NAME } from '../lib/passStack/s3';
import { slsMentorResult } from './testSetup/slsMentorResult';

const ruleName = S3IntelligentTieringRule['ruleName'];

const slsMentorOutput = slsMentorResult[ruleName];

describe('s3-intelligent-tiering', () => {
  it('sls-mentor passes on S3 bucket with intelligent tiering ', () => {
    const { result } = slsMentorOutput;
    expect(
      result.find(r =>
        r.arn.resource.includes(
          PASS_INTELLIGENT_TIERING_BUCKET_NAME.toLowerCase(),
        ),
      )?.success,
    ).toBe(true);
  });

  it('sls-mentor fails on S3 bucket with no intelligent tiering ', () => {
    const { result } = slsMentorOutput;
    expect(
      result.find(r =>
        r.arn.resource.includes(
          FAIL_INTELLIGENT_TIERING_BUCKET_NAME.toLowerCase(),
        ),
      )?.success,
    ).toBe(false);
  });
});
