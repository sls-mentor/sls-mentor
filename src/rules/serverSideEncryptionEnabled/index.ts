import { fetchAllS3BucketEncryptionConfigurations } from '../../aws-sdk-helpers';
import { GuardianLevel } from '../../constants/level';
import { Category, Rule } from '../../types';

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

const rule: Rule = {
  ruleName: 'S3: Server-side Encryption Enabled',
  errorMessage: 'Server-side Encryption is not enabled on this S3 bucket',
  run,
  fileName: 'serverSideEncryptionEnabled',
  categories: [Category.SECURITY],
  level: GuardianLevel.Level1,
};

export default rule;
