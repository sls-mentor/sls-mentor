import { IntelligentTieringConfiguration } from '@aws-sdk/client-s3';
import { build } from '@aws-sdk/util-arn-parser';
import { fetchAllS3BucketIntelligentTieringConfigurations } from '../../helpers';
import { filterS3BucketFromResources } from '../../helpers/filterS3BucketFromResources';
import { Rule } from '../../types';

const hasIntelligentTiering = (
  configuration: IntelligentTieringConfiguration[] | undefined,
): boolean => configuration?.some(item => item.Status === 'Enabled') ?? false;

const run: Rule['run'] = async resourceArns => {
  const buckets = filterS3BucketFromResources(resourceArns);
  const s3BucketConfigurations =
    await fetchAllS3BucketIntelligentTieringConfigurations(buckets);
  const results = s3BucketConfigurations.map(({ arn, configuration }) => ({
    arn: build(arn),
    success: hasIntelligentTiering(configuration),
  }));

  return { results };
};

const rule: Rule = {
  ruleName: 'S3: Use Intelligent Tiering',
  errorMessage:
    'Intelligent Tiering is not enabled on this S3 bucket.\nSee (https://github.com/Kumo-by-Theodo/guardian/blob/master/docs/rules/use-intelligent-tiering.md) for impact and how to resolve.',
  run,
};

export default rule;
