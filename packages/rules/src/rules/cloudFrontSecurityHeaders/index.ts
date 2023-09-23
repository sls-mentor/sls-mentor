import { CloudFrontDistributionARN } from '@sls-mentor/arn';
import {
  fetchAllDistributions,
  fetchResponseHeadersPolicyByResponseHeadersPolicyId,
  getResponseHeadersPolicyIdsByDistribution,
} from '@sls-mentor/aws-api';

import { Rule } from 'types';

enum SecurityHeader {
  StrictTransportSecurity = 'Strict-Transport-Security',
  ReferrerPolicy = 'Referrer-Policy',
  XContentTypeOptions = 'X-Content-Type-Options',
  XFrameOptions = 'X-Frame-Options',
  XXSSProtection = 'X-XSS-Protection',
}

type EnabledSecurityHeaders = Partial<Record<SecurityHeader, true>>;

type ResponseHeadersPolicy = Awaited<
  ReturnType<typeof fetchResponseHeadersPolicyByResponseHeadersPolicyId>
>;

const areSecurityHeadersEnabledOnPolicy = (
  policy?: ResponseHeadersPolicy,
): boolean => {
  if (policy === undefined) {
    return false;
  }

  const enabledSecurityHeaders: EnabledSecurityHeaders =
    getSecurityHeadersConfigSecurityHeaders(policy);

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

const getSecurityHeadersConfigSecurityHeaders = (
  policy: ResponseHeadersPolicy,
): EnabledSecurityHeaders => {
  const securityHeadersConfig =
    policy?.ResponseHeadersPolicyConfig?.SecurityHeadersConfig;

  return {
    ...(securityHeadersConfig?.StrictTransportSecurity
      ?.AccessControlMaxAgeSec !== undefined
      ? { [SecurityHeader.StrictTransportSecurity]: true }
      : {}),
    ...(securityHeadersConfig?.ReferrerPolicy?.ReferrerPolicy !== undefined
      ? { [SecurityHeader.ReferrerPolicy]: true }
      : {}),
    ...(securityHeadersConfig?.ContentTypeOptions?.Override !== undefined
      ? { [SecurityHeader.XContentTypeOptions]: true }
      : {}),
    ...(securityHeadersConfig?.FrameOptions?.FrameOption !== undefined
      ? { [SecurityHeader.XFrameOptions]: true }
      : {}),
    ...(securityHeadersConfig?.XSSProtection?.Protection === true &&
    securityHeadersConfig.XSSProtection.ModeBlock === true
      ? { [SecurityHeader.XXSSProtection]: true }
      : {}),
  };
};

const run: Rule['run'] = async resourceArns => {
  const distributions = await fetchAllDistributions(resourceArns);

  const distributionIdPolicyIdCouples: {
    distributionId: string;
    policyId?: string;
  }[] = [];
  for (const distribution of distributions) {
    const responseHeadersPolicyIds =
      getResponseHeadersPolicyIdsByDistribution(distribution);
    distributionIdPolicyIdCouples.push(
      ...responseHeadersPolicyIds.map(policyId => ({
        distributionId: distribution.Id,
        policyId,
      })),
    );
  }

  const distributionIdPolicyCouples: {
    distributionId: string;
    policy?: ResponseHeadersPolicy;
  }[] = await Promise.all(
    distributionIdPolicyIdCouples.map(async ({ distributionId, policyId }) => {
      const policy = await fetchResponseHeadersPolicyByResponseHeadersPolicyId(
        policyId,
      );

      return { distributionId, policy };
    }),
  );

  const distributionIdEnabledSecurityHeadersCouples =
    distributionIdPolicyCouples.map(({ distributionId, policy }) => ({
      distributionId,
      areSecurityHeadersEnabledOnPolicy:
        areSecurityHeadersEnabledOnPolicy(policy),
    }));

  const results = distributions.map(distribution => ({
    arn: CloudFrontDistributionARN.fromDistributionId(distribution.Id),
    success: distributionIdEnabledSecurityHeadersCouples
      .filter(({ distributionId }) => distribution.Id === distributionId)
      .every(({ areSecurityHeadersEnabledOnPolicy: enabled }) => enabled),
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
  level: 4,
  service: 'CloudFront',
  easyToFix: true,
  severity: 'high',
};
