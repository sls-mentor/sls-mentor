import { Distribution } from '@aws-sdk/client-cloudfront';
import { fetchAllDistributions } from '../../aws-sdk-helpers/cloudFront';
import getDistributionResponseHeadersPolicyIds from '../../aws-sdk-helpers/cloudFront/getDistributionResponseHeadersPolicyIds';
import { Rule } from '../../types';
import { CloudFrontDistributionARN } from '../../types/arn/cloudFront';

const areSecurityHeadersEnabled = (distribution: Distribution) => {
  const responseHeadersPolicyIds =
    getDistributionResponseHeadersPolicyIds(distribution);

  /**
   * Let's hard code the ID of the policy that has the security headers and is managed by AWS.
   */
  if (
    responseHeadersPolicyIds.includes('67f7725c-6f97-4210-82d7-5512b31e9d03')
  ) {
    return true;
  }

  /**
   * TODO: analyze the response headers policies to ensure all security headers are present
   * In fact, not only the managed policy '67f7725c-6f97-4210-82d7-5512b31e9d03' has the headers,
   * but the custom policies may also have them.
   *
   * const responseHeadersPolicies = await Promise.all(
   *   responseHeadersPolicyIds.map(fetchResponseHeaderPolicyById),
   * );
   *
   * ...
   */

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
  easyToFix: true,
  severity: 'high',
};
