import { IntelligentTieringConfiguration } from '@aws-sdk/client-s3';
import { build } from '@aws-sdk/util-arn-parser';
import { fetchAllS3BucketConfigurations } from '../../helpers';
import { filterS3BucketFromResources } from '../../helpers/filterS3BucketFromResources';
import {
  CheckResult,
  ErrorMessages,
  Resource,
  Rule,
  RuleDisplayNames,
} from '../../types';

const hasIntelligentTiering = (
  configuration: IntelligentTieringConfiguration[] | undefined,
): boolean => configuration?.some(item => item.Status === 'Enabled') ?? false;

const run = async (
  resources: Resource[],
): Promise<{
  results: CheckResult[];
}> => {
  const buckets = filterS3BucketFromResources(resources);
  const s3BucketConfigurations = await fetchAllS3BucketConfigurations(buckets);
  const results = s3BucketConfigurations.map((configuration, index) => ({
    arn: build(buckets[index].arn),
    success: hasIntelligentTiering(configuration),
  }));

  return { results };
};

export default {
  ruleName: RuleDisplayNames.INTELLIGENT_TIERING,
  errorMessage: ErrorMessages.INTELLIGENT_TIERING,
  run,
} as Rule;
