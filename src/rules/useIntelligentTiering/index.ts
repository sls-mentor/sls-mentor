import { IntelligentTieringConfiguration } from '@aws-sdk/client-s3';
import { ARN, build } from '@aws-sdk/util-arn-parser';
import { fetchAllS3BucketConfigurations } from '../../helpers';
import { filterS3BucketFromResources } from '../../helpers/filterS3BucketFromResources';
import {
  CheckResult,
  ErrorMessages,
  Rule,
  RuleDisplayNames,
} from '../../types';

const hasIntelligentTiering = (
  configuration: IntelligentTieringConfiguration[] | undefined,
): boolean => configuration?.some(item => item.Status === 'Enabled') ?? false;

const run = async (
  resourceArns: ARN[],
): Promise<{
  results: CheckResult[];
}> => {
  const buckets = filterS3BucketFromResources(resourceArns);
  const s3BucketConfigurations = await fetchAllS3BucketConfigurations(buckets);
  const results = s3BucketConfigurations.map((configuration, index) => ({
    arn: build(buckets[index]),
    success: hasIntelligentTiering(configuration),
  }));

  return { results };
};

export default {
  ruleName: RuleDisplayNames.INTELLIGENT_TIERING,
  errorMessage: ErrorMessages.INTELLIGENT_TIERING,
  run,
} as Rule;
