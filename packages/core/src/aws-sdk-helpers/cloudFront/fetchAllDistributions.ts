import {
  Distribution,
  GetDistributionCommand,
} from '@aws-sdk/client-cloudfront';
import { cloudFrontClient } from '../../clients';
import { CustomARN } from '../../types';
import { CloudFrontDistributionARN } from '../../types/arn/cloudFront';

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
): Promise<Distribution[]> => {
  const distributionArns = CustomARN.filterArns(
    resourceArns,
    CloudFrontDistributionARN,
  );

  const distributionIds = distributionArns.map(arn => arn.getDistributionId());

  const distributions = await Promise.all(
    distributionIds.map(fetchDistribution),
  );

  const definedDistributions = distributions.filter(
    (distribution): distribution is Distribution => distribution !== undefined,
  );

  return definedDistributions;
};

export default fetchAllDistributions;
