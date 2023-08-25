import { DistributionConfig } from '@aws-sdk/client-cloudfront';
import { fetchDistributionConfig } from '../../aws-sdk-helpers/cloudFront';
import { Stage } from '../../constants/stage';
import { CloudFrontDistributionARN, CustomARN, Rule } from '../../types';

const noHttpAllowed = (distributionConfig: DistributionConfig | undefined) => {
  if (!distributionConfig) return false;
  if (
    distributionConfig.DefaultCacheBehavior?.ViewerProtocolPolicy ===
    'allow-all'
  ) {
    return false;
  }

  return (distributionConfig.CacheBehaviors?.Items ?? []).every(item => {
    return item.ViewerProtocolPolicy !== 'allow-all';
  });
};

const run: Rule['run'] = async resourceArns => {
  const distributionArns = CustomARN.filterArns(
    resourceArns,
    CloudFrontDistributionARN,
  );

  const results = await Promise.all(
    distributionArns.map(async arn => ({
      arn: arn,
      success: noHttpAllowed(
        await fetchDistributionConfig(arn.getDistributionId()),
      ),
    })),
  );

  return { results };
};

export const cloudFrontNoHttp: Rule = {
  ruleName:
    'CloudFront: use only https or redirect http to https on the cache behaviors of your distributions',
  errorMessage:
    'Http is allowed and not redirected to https on this distribution',
  run,
  fileName: 'cloudFrontNoHttp',
  categories: ['Security'],
  level: 2,
  service: 'CloudFront',
  easyToFix: true,
  severity: 'high',
  stage: [Stage.dev, Stage.prod],
};
