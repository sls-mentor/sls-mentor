import {
  IntelligentTieringConfiguration,
  ListBucketIntelligentTieringConfigurationsCommand,
} from '@aws-sdk/client-s3';
import { ARN } from '@aws-sdk/util-arn-parser';
import { s3Client } from '../../clients';
import { filterS3BucketFromResources } from './filterS3BucketFromResources';

const fetchS3BucketConfigurationByArn = async (
  arn: ARN,
): Promise<IntelligentTieringConfiguration[] | undefined> => {
  const { IntelligentTieringConfigurationList: configurationList } =
    await s3Client.send(
      new ListBucketIntelligentTieringConfigurationsCommand({
        Bucket: arn.resource,
      }),
    );

  return configurationList;
};

export const fetchAllS3BucketIntelligentTieringConfigurations = async (
  resources: ARN[],
): Promise<
  { arn: ARN; configuration: IntelligentTieringConfiguration[] | undefined }[]
> => {
  const buckets = filterS3BucketFromResources(resources);

  return Promise.all(
    buckets.map(async arn => ({
      arn,
      configuration: await fetchS3BucketConfigurationByArn(arn),
    })),
  );
};
