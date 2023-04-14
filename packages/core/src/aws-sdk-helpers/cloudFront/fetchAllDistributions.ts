import {
  Distribution,
  GetDistributionCommand,
} from '@aws-sdk/client-cloudfront';
import { cloudFrontClient } from 'clients';
import { CustomARN } from 'types';
import { CloudFrontDistributionARN } from 'types/arn/cloudFront';

type DistributionWithDefinedId = Distribution & { Id: string };

const fetchDistribution = async (
  Id: string,
): Promise<Distribution | undefined> => {
  const { Distribution: distribution } = await cloudFrontClient.send(
    new GetDistributionCommand({ Id }),
  );

  return distribution;
};

const fetchAllDistributions = async (
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

export default fetchAllDistributions;
