import { Distribution } from '@aws-sdk/client-cloudfront';

export const getResponseHeadersPolicyIdsByDistribution = (
  distribution: Distribution,
): (string | undefined)[] => {
  if (distribution.DistributionConfig === undefined) {
    return [undefined];
  }

  const defaultCacheBehavior =
    distribution.DistributionConfig.DefaultCacheBehavior;

  if (defaultCacheBehavior === undefined) {
    return [undefined];
  }

  // TODO: support multiple behaviors
  // const cacheBehaviors =
  //   distribution.DistributionConfig.CacheBehaviors?.Items ?? [];

  // const allCacheBehaviors = [defaultCacheBehavior, ...cacheBehaviors];
  const allCacheBehaviors = [defaultCacheBehavior];

  const responseHeadersPolicyIds = allCacheBehaviors.map(
    ({ ResponseHeadersPolicyId }) => ResponseHeadersPolicyId,
  );

  return responseHeadersPolicyIds;
};
