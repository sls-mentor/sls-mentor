import {
  GetBucketEncryptionCommand,
  S3ServiceException,
  ServerSideEncryptionConfiguration,
} from '@aws-sdk/client-s3';
import { s3Client } from 'clients';
import { CustomARN, S3BucketARN } from 'types';

const fetchS3BucketEncryptionConfigurationByArn = async (
  arn: S3BucketARN,
): Promise<ServerSideEncryptionConfiguration | undefined> => {
  try {
    const { ServerSideEncryptionConfiguration: configuration } =
      await s3Client.send(
        new GetBucketEncryptionCommand({
          Bucket: arn.resource,
        }),
      );

    return configuration;
  } catch (e) {
    if (
      e instanceof S3ServiceException &&
      [
        'ServerSideEncryptionConfigurationNotFoundError',
        'PermanentRedirect',
      ].includes(e.name)
    ) {
      return undefined;
    }
    throw e;
  }
};

export const fetchAllS3BucketEncryptionConfigurations = async (
  resources: CustomARN[],
): Promise<
  {
    arn: S3BucketARN;
    configuration:
      | ServerSideEncryptionConfiguration
      | undefined
      | 'noServerSideEncryption';
  }[]
> => {
  const buckets = CustomARN.filterArns(resources, S3BucketARN);

  return Promise.all(
    buckets.map(async arn => ({
      arn,
      configuration: await fetchS3BucketEncryptionConfigurationByArn(arn),
    })),
  );
};
