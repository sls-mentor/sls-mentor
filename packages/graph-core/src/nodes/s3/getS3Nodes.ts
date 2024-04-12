import { CustomARN, S3BucketARN } from '@sls-mentor/arn';
import { fetchAllS3BucketSizes } from '@sls-mentor/aws-api';

import { S3BucketConfigurationStats, S3BucketStats } from './types';

const mapConfigurationStats = (
  s3BucketConfiguration: Awaited<
    ReturnType<typeof fetchAllS3BucketSizes>
  >[number]['policy'],
): S3BucketConfigurationStats | undefined => {
  if (
    s3BucketConfiguration === undefined ||
    s3BucketConfiguration[0] === undefined
  ) {
    return undefined;
  }
  const { Average } = s3BucketConfiguration[0];

  if (Average === undefined) {
    return undefined;
  }

  return {
    bucketSize: Average,
  };
};

export const getS3Nodes = async (
  resources: {
    arn: CustomARN;
    cloudformationStack?: string;
    tags: Record<string, string>;
  }[],
): Promise<
  Record<
    string,
    {
      arn: S3BucketARN;
      stats: S3BucketStats;
      cloudformationStack: string | undefined;
      tags: Record<string, string>;
    }
  >
> => {
  const tableConfigurations = await fetchAllS3BucketSizes(
    resources.map(({ arn }) => arn),
  );

  return Object.fromEntries(
    tableConfigurations.map(({ arn, policy }) => {
      return [
        arn.toString(),
        {
          arn,
          stats: {
            configuration: mapConfigurationStats(policy),
          },
          cloudformationStack: resources.find(resource => resource.arn.is(arn))
            ?.cloudformationStack,
          tags: resources.find(resource => resource.arn.is(arn))?.tags ?? {},
        },
      ];
    }),
  );
};
