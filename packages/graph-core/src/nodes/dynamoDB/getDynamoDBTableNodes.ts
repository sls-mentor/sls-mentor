import { CustomARN, DynamoDBTableARN } from '@sls-mentor/arn';
import { fetchAllDynamoDBTableConfigurations } from '@sls-mentor/aws-api';

import { DynamoDBTableConfigurationStats, DynamoDBTableStats } from './types';

const mapConfigurationStats = (
  dynamoDBTableConfiguration: Awaited<
    ReturnType<typeof fetchAllDynamoDBTableConfigurations>
  >[number]['configuration'],
): DynamoDBTableConfigurationStats | undefined => {
  const { ItemCount, TableSizeBytes } = dynamoDBTableConfiguration;

  if (ItemCount === undefined || TableSizeBytes === undefined) {
    return undefined;
  }

  return {
    itemCount: ItemCount,
    tableSize: TableSizeBytes,
    averageItemSize: TableSizeBytes / ItemCount,
  };
};

export const getDynamoDBTableNodes = async (
  resources: {
    arn: CustomARN;
    cloudformationStack?: string;
    tags: Record<string, string>;
  }[],
): Promise<
  Record<
    string,
    {
      arn: DynamoDBTableARN;
      stats: DynamoDBTableStats;
      cloudformationStack: string | undefined;
      tags: Record<string, string>;
    }
  >
> => {
  const tableConfigurations = await fetchAllDynamoDBTableConfigurations(
    resources.map(({ arn }) => arn),
  );

  return Object.fromEntries(
    tableConfigurations.map(({ arn, configuration }) => {
      return [
        arn.toString(),
        {
          arn,
          stats: {
            configuration: mapConfigurationStats(configuration),
          },
          cloudformationStack: resources.find(resource => resource.arn.is(arn))
            ?.cloudformationStack,
          tags: resources.find(resource => resource.arn.is(arn))?.tags ?? {},
        },
      ];
    }),
  );
};
