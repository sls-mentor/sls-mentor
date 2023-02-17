import { Distribution } from '@aws-sdk/client-cloudfront';
import {
  fetchAllDistributions,
  getEnabledSecurityHeadersByManagedPolicies,
} from '../../aws-sdk-helpers/cloudFront';
import { EnabledSecurityHeaders, Rule, SecurityHeader } from '../../types';
import { CloudFrontDistributionARN } from '../../types/arn/cloudFront';

const areSecurityHeadersEnabled = (distribution: Distribution) => {
  const enabledSecurityHeaders: EnabledSecurityHeaders = {
    ...getEnabledSecurityHeadersByManagedPolicies(distribution),
  };

  if (
    enabledSecurityHeaders[SecurityHeader.StrictTransportSecurity] &&
    enabledSecurityHeaders[SecurityHeader.ReferrerPolicy] &&
    enabledSecurityHeaders[SecurityHeader.XContentTypeOptions] &&
    enabledSecurityHeaders[SecurityHeader.XFrameOptions] &&
    enabledSecurityHeaders[SecurityHeader.XXSSProtection]
  ) {
    return true;
  }

  return false;
};

const run: Rule['run'] = async resourceArns => {
  const distributions = await fetchAllDistributions(resourceArns);

  const results = distributions.map(distribution => ({
    arn: CloudFrontDistributionARN.fromDistributionId(distribution.Id ?? ''),
    success: areSecurityHeadersEnabled(distribution),
  }));

  return { results };
};

export const cloudFrontSecurityHeaders: Rule = {
  ruleName:
    'CloudFront: use SecurityHeadersPolicy on the cache behaviors of your distributions',
  errorMessage:
    'SecurityHeadersPolicy is not enabled on a behavior of the distribution',
  run,
  fileName: 'cloudFrontSecurityHeaders',
  categories: ['Security'],
  level: 1,
  service: 'CloudFront',
};
