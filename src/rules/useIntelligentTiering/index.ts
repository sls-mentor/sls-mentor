import { IntelligentTieringConfiguration } from '@aws-sdk/client-s3';
import { build } from '@aws-sdk/util-arn-parser';
import { baseConfigTypeGuard } from '../../configuration/utils/baseConfigTypeGuard';
import { fetchAllS3BucketIntelligentTieringConfigurations } from '../../aws-sdk-helpers';
import { BaseConfiguration, Category, Rule } from '../../types';

type Configuration = BaseConfiguration;
type UseIntelligentTieringRule = Rule<Configuration>;

const hasIntelligentTiering = (
  configuration: IntelligentTieringConfiguration[] | undefined,
): boolean => configuration?.some(item => item.Status === 'Enabled') ?? false;

const run: UseIntelligentTieringRule['run'] = async resourceArns => {
  const s3BucketConfigurations =
    await fetchAllS3BucketIntelligentTieringConfigurations(resourceArns);
  const results = s3BucketConfigurations.map(({ arn, configuration }) => ({
    arn: build(arn),
    success: hasIntelligentTiering(configuration),
  }));

  return { results };
};

const rule: UseIntelligentTieringRule = {
  name: 'USE_INTELLIGENT_TIERING',
  displayName: 'S3: Use Intelligent Tiering',
  errorMessage: 'Intelligent Tiering is not enabled on this S3 bucket',
  run,
  fileName: 'useIntelligentTiering',
  categories: [Category.GREEN_IT, Category.IT_COSTS],
  configurationTypeGuards: baseConfigTypeGuard,
};

export default rule;
