import { Distribution } from '@aws-sdk/client-cloudfront';

const getDistributionResponseHeadersPolicyIds = (
  distribution: Distribution,
): (string | undefined)[] => {
  if (distribution.DistributionConfig === undefined) {
    return [];
  }

  const defaultCacheBehavior =
    distribution.DistributionConfig.DefaultCacheBehavior;

  if (defaultCacheBehavior === undefined) {
    return [];
  }

  const cacheBehaviors =
    distribution.DistributionConfig.CacheBehaviors?.Items ?? [];

  const allCacheBehaviors = [defaultCacheBehavior, ...cacheBehaviors];

  const responseHeadersPolicyIds = allCacheBehaviors.map(
    ({ ResponseHeadersPolicyId }) => ResponseHeadersPolicyId,
  );

  return responseHeadersPolicyIds;
};

export default getDistributionResponseHeadersPolicyIds;
