import { fetchAllS3BucketEncryptionConfigurations } from '../../aws-sdk-helpers';
import { Rule } from '../../types';

const run: Rule['run'] = async resourceArns => {
  const s3BucketConfigurations = await fetchAllS3BucketEncryptionConfigurations(
    resourceArns,
  );
  const results = s3BucketConfigurations.map(({ arn, configuration }) => ({
    arn,
    success: configuration !== undefined,
  }));

  return { results };
};

export const serverSideEncryptionEnabled: Rule = {
  ruleName: 'S3: Server-side Encryption Enabled',
  errorMessage: 'Server-side Encryption is not enabled on this S3 bucket',
  run,
  fileName: 'serverSideEncryptionEnabled',
  categories: ['Security'],
  level: 1,
  service: 'S3',
  easyToFix: true,
  severity: 'medium',
};
