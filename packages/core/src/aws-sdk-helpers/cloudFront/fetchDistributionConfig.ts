import {
  DistributionConfig,
  GetDistributionConfigCommand,
} from '@aws-sdk/client-cloudfront';
import { cloudFrontClient } from '../../clients';

const fetchDistributionConfig = async (
  id: string | undefined,
): Promise<DistributionConfig | undefined> => {
  const command = new GetDistributionConfigCommand({ Id: id });

  const commandOutput = await cloudFrontClient.send(command);

  const distributionConfig = commandOutput.DistributionConfig;

  return distributionConfig;
};

export default fetchDistributionConfig;
