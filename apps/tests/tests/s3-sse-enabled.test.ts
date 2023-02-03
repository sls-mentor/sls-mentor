import { describe, expect, it } from 'vitest';
import ServiceSideEncryptionEnabled from '../../../packages/sls-mentor/src/rules/serverSideEncryptionEnabled';
import { FAIL_INTELLIGENT_TIERING_BUCKET_NAME } from '../lib/failStack/s3';
import { PASS_INTELLIGENT_TIERING_BUCKET_NAME } from '../lib/passStack/s3';
import { slsMentorResult } from './testSetup/slsMentorResult';

const ruleName = ServiceSideEncryptionEnabled['ruleName'];

const slsMentorOutput = slsMentorResult[ruleName];

describe('s3-sse-enabled', () => {
  it('sls-mentor passes on S3 bucket with SSE enable ', () => {
    const { result } = slsMentorOutput;
    expect(
      result.find(r =>
        r.arn.resource.includes(
          PASS_INTELLIGENT_TIERING_BUCKET_NAME.toLowerCase(),
        ),
      )?.success,
    ).toBe(true);
  });
  it('sls-mentor fails on S3 bucket with no server side encryption', () => {
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
