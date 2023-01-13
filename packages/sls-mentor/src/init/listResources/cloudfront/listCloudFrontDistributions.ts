import {
  DistributionSummary,
  paginateListDistributions,
} from '@aws-sdk/client-cloudfront';
import { cloudFrontClient } from '../../../clients';
import { CloudFrontDistributionARN } from '../../../types/arn/cloudFront';

export const listCloudFrontDistributions = async (): Promise<
  CloudFrontDistributionARN[]
> => {
  const cloudFrontDistributions: DistributionSummary[] = [];

  for await (const resources of paginateListDistributions(
    { client: cloudFrontClient },
    {},
  )) {
    cloudFrontDistributions.push(...(resources.DistributionList?.Items ?? []));
  }

  return cloudFrontDistributions.map(({ Id }) =>
    CloudFrontDistributionARN.fromDistributionId(Id ?? ''),
  );
};
