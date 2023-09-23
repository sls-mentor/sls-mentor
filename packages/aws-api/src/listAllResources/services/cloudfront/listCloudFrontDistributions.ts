import {
  DistributionSummary,
  paginateListDistributions,
} from '@aws-sdk/client-cloudfront';

import { CloudFrontDistributionARN } from '@sls-mentor/arn';

import { cloudFrontClient } from 'clients';

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
