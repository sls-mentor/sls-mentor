import { describe, expect, it } from 'vitest';
import S3IntelligentTieringRule from '../../src/rules/useIntelligentTiering';
import { guardianResult } from './testSetup/guardianResult';

const ruleName = S3IntelligentTieringRule['ruleName'];

const guardianOutput = guardianResult[ruleName];

// TODO : create .env to hold resource ARNs
const validS3Arn =
  'arn:aws:s3:::guardian-e2e-1-intelligenttieringbucket54bc40b8-167fvfeurywl6';

describe('', () => {
  it('guardian passes on S3 bucket with intelligent tiering ', () => {
    const { result } = guardianOutput;
    expect(result.find(r => r.arn === validS3Arn)?.success).toBe(true);
  });
});
