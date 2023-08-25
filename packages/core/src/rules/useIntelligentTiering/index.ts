import { LifecycleRule } from '@aws-sdk/client-s3';
import { fetchAllS3BucketLifeCycleRules } from '../../aws-sdk-helpers';
import { Stage } from '../../constants/stage';
import { Rule } from '../../types';

const hasIntelligentTiering = (rules: LifecycleRule[] | undefined): boolean =>
  rules?.some(
    item =>
      item.Status === 'Enabled' &&
      item.Transitions?.some(
        transition =>
          transition.StorageClass === 'INTELLIGENT_TIERING' &&
          transition.Days === 0,
      ),
  ) ?? false;

const run: Rule['run'] = async resourceArns => {
  const s3BucketLifecycleRules = await fetchAllS3BucketLifeCycleRules(
    resourceArns,
  );
  const results = s3BucketLifecycleRules.map(({ arn, rules }) => ({
    arn,
    success: hasIntelligentTiering(rules),
  }));

  return { results };
};

export const useIntelligentTiering: Rule = {
  ruleName: 'S3: Use Intelligent Tiering',
  errorMessage: 'Intelligent Tiering is not enabled on this S3 bucket',
  run,
  fileName: 'useIntelligentTiering',
  categories: ['GreenIT', 'ITCosts'],
  level: 2,
  service: 'S3',
  easyToFix: true,
  severity: 'high',
  stage: [Stage.prod, Stage.dev],
};
