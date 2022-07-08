import {
  IntelligentTieringConfiguration,
  ListBucketIntelligentTieringConfigurationsCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ARN } from '@aws-sdk/util-arn-parser';
import { Resource } from '../types';

const fetchS3BucketConfigurationByArn = async (
  arn: ARN,
  client: S3Client,
): Promise<IntelligentTieringConfiguration[] | undefined> => {
  const { IntelligentTieringConfigurationList: configurationList } =
    await client.send(
      new ListBucketIntelligentTieringConfigurationsCommand({
        Bucket: arn.resource,
      }),
    );

  return configurationList;
};

export const fetchAllS3BucketConfigurations = async (
  buckets: Resource[],
): Promise<(IntelligentTieringConfiguration[] | undefined)[]> => {
  const client = new S3Client({});

  const bucketConfigurations = await Promise.all(
    buckets.map(({ arn }) => fetchS3BucketConfigurationByArn(arn, client)),
  );

  return bucketConfigurations;
};
