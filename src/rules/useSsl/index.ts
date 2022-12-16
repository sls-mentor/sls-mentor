import {
  fetchAllS3BucketPolicies,
  S3BucketPolicy,
} from '../../aws-sdk-helpers';
import { GuardianLevel } from '../../constants/level';
import { Category, Rule } from '../../types';

const hasSSLConfiguration = (policy: S3BucketPolicy): boolean =>
  policy.Statement.some(
    ({ Effect, Condition }) =>
      Effect === 'Deny' && Condition.Bool['aws:SecureTransport'] === 'false',
  );

const run: Rule['run'] = async resourceArns => {
  const s3BucketConfigurations = await fetchAllS3BucketPolicies(resourceArns);
  const results = s3BucketConfigurations.map(({ arn, policy }) => ({
    arn,
    success: hasSSLConfiguration(policy),
  }));

  return { results };
};

const rule: Rule = {
  ruleName: 'S3: Use SSL requests only',
  errorMessage: 'SSL requests only is not enabled on this S3 bucket',
  run,
  fileName: 'useSsl',
  categories: [Category.GREEN_IT, Category.IT_COSTS],
  level: GuardianLevel.Level2,
};

export default rule;
