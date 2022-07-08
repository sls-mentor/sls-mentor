import {
  IntelligentTieringConfiguration,
  ListBucketIntelligentTieringConfigurationsCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ARN } from '@aws-sdk/util-arn-parser';

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

export const fetchAllS3BucketIntelligentTieringConfigurations = async (
  buckets: ARN[],
): Promise<
  { arn: ARN; configuration: IntelligentTieringConfiguration[] | undefined }[]
> => {
  const client = new S3Client({});

  return Promise.all(
    buckets.map(async arn => ({
      arn,
      configuration: await fetchS3BucketConfigurationByArn(arn, client),
    })),
  );
};
