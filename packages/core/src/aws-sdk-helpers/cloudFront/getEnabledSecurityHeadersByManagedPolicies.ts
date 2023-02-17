import { Distribution } from '@aws-sdk/client-cloudfront';
import { EnabledSecurityHeaders, SecurityHeader } from '../../types';
import getDistributionResponseHeadersPolicyIds from './getDistributionResponseHeadersPolicyIds';

const getEnabledSecurityHeadersByManagedPolicies = (
  distribution: Distribution,
): EnabledSecurityHeaders => {
  const policyIds = getDistributionResponseHeadersPolicyIds(distribution);

  // Available managed policies are listed here:
  // https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-response-headers-policies.html
  if (
    policyIds.includes('67f7725c-6f97-4210-82d7-5512b31e9d03') ||
    policyIds.includes('eaab4381-ed33-4a86-88ca-d9558dc6cd63') ||
    policyIds.includes('e61eb60c-9c35-4d20-a928-2b84e02af89c')
  ) {
    return {
      [SecurityHeader.StrictTransportSecurity]: true,
      [SecurityHeader.ReferrerPolicy]: true,
      [SecurityHeader.XContentTypeOptions]: true,
      [SecurityHeader.XFrameOptions]: true,
      [SecurityHeader.XXSSProtection]: true,
    };
  }

  return {};
};

export default getEnabledSecurityHeadersByManagedPolicies;
