import {
  Distribution,
  GetDistributionCommand,
} from '@aws-sdk/client-cloudfront';

import { CloudFrontDistributionARN, CustomARN } from '@sls-mentor/arn';

import { cloudFrontClient } from 'clients';

type DistributionWithDefinedId = Distribution & { Id: string };

const fetchDistribution = async (
  Id: string,
): Promise<Distribution | undefined> => {
  const { Distribution: distribution } = await cloudFrontClient.send(
    new GetDistributionCommand({ Id }),
  );

  return distribution;
};

export const fetchAllDistributions = async (
  resourceArns: CustomARN[],
): Promise<DistributionWithDefinedId[]> => {
  const distributionArns = CustomARN.filterArns(
    resourceArns,
    CloudFrontDistributionARN,
  );

  const distributionIds = distributionArns.map(arn => arn.getDistributionId());

  return (await Promise.all(distributionIds.map(fetchDistribution)))
    .filter(
      (distribution): distribution is Distribution =>
        distribution !== undefined,
    )
    .filter(
      (distribution): distribution is DistributionWithDefinedId =>
        distribution.Id !== undefined,
    );
};
