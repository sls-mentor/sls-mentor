import { IntelligentTieringConfiguration } from '@aws-sdk/client-s3';
import { build } from '@aws-sdk/util-arn-parser';
import { fetchAllS3BucketIntelligentTieringConfigurations } from '../../aws-sdk-helpers';
import { Category, Rule } from '../../types';

const hasIntelligentTiering = (
  configuration: IntelligentTieringConfiguration[] | undefined,
): boolean => configuration?.some(item => item.Status === 'Enabled') ?? false;

const run: Rule['run'] = async resourceArns => {
  const s3BucketConfigurations =
    await fetchAllS3BucketIntelligentTieringConfigurations(resourceArns);
  const results = s3BucketConfigurations.map(({ arn, configuration }) => ({
    arn: build(arn),
    success: hasIntelligentTiering(configuration),
  }));

  return { results };
};

const rule: Rule = {
  displayName: 'S3: Use Intelligent Tiering',
  errorMessage: 'Intelligent Tiering is not enabled on this S3 bucket',
  run,
  fileName: 'useIntelligentTiering',
  categories: [Category.GREEN_IT, Category.IT_COSTS],
};

export default rule;
