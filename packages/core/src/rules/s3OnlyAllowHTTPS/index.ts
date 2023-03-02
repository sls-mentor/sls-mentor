import {
  fetchAllS3BucketPolicies,
  S3BucketPolicy,
} from '../../aws-sdk-helpers';
import { Rule } from '../../types';

const hasSSLConfiguration = (policy: S3BucketPolicy | undefined): boolean => {
  if (policy === undefined) return false;

  return policy.Statement.some(
    ({ Effect, Condition }) =>
      Effect === 'Deny' && Condition.Bool['aws:SecureTransport'] === 'false',
  );
};

const run: Rule['run'] = async resourceArns => {
  const s3BucketConfigurations = await fetchAllS3BucketPolicies(resourceArns);
  const results = s3BucketConfigurations.map(({ arn, policy }) => ({
    arn,
    success: hasSSLConfiguration(policy),
  }));

  return { results };
};

export const s3OnlyAllowHTTPS: Rule = {
  ruleName: 'S3: Use HTTPS requests only',
  errorMessage: 'HTTPS requests only is not enabled on this S3 bucket',
  run,
  fileName: 's3OnlyAllowHTTPS',
  categories: ['Security'],
  level: 2,
  service: 'S3',
};
