import { DistributionConfig } from '@aws-sdk/client-cloudfront';
import {
  fetchAllDistributions,
  fetchDistributionConfig,
} from '../../aws-sdk-helpers/cloudFront';
import { Stage } from '../../constants/stage';
import { Rule } from '../../types';
import { CloudFrontDistributionARN } from '../../types/arn/cloudFront';

const areSSLCertificateAssociated = (
  distributionConfig: DistributionConfig | undefined,
) => {
  if (!distributionConfig) return false;

  return (
    distributionConfig.ViewerCertificate?.IAMCertificateId !== undefined ||
    distributionConfig.ViewerCertificate?.ACMCertificateArn !== undefined
  );
};

const run: Rule['run'] = async resourceArns => {
  const distributions = await fetchAllDistributions(resourceArns);
  const distributionConfigs = await Promise.all(
    distributions.map(
      async distribution => await fetchDistributionConfig(distribution.Id),
    ),
  );

  const results = distributions.map((distribution, index) => ({
    arn: CloudFrontDistributionARN.fromDistributionId(distribution.Id ?? ''),
    success: areSSLCertificateAssociated(distributionConfigs[index]),
  }));

  return { results };
};

export const cloudFrontSSLCertificate: Rule = {
  ruleName:
    'CloudFront: your distributions should be associated with a SSL certificate (ACM or IAM).',
  errorMessage: 'Your distributions are not associated with a SSL certificate.',
  run,
  fileName: 'cloudFrontSSLCertificate',
  categories: ['Security'],
  level: 2,
  service: 'CloudFront',
  easyToFix: false,
  severity: 'high',
  stage: [Stage.dev, Stage.prod],
};
