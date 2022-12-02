import {
  GetBucketEncryptionCommand,
  IntelligentTieringConfiguration,
  ListBucketIntelligentTieringConfigurationsCommand,
  S3ServiceException,
  ServerSideEncryptionConfiguration,
} from '@aws-sdk/client-s3';
import { s3Client } from '../../clients';
import { GuardianARN, S3BucketARN } from '../../types';

const fetchS3BucketConfigurationByArn = async (
  arn: S3BucketARN,
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
  resources: GuardianARN[],
): Promise<
  {
    arn: S3BucketARN;
    configuration: IntelligentTieringConfiguration[] | undefined;
  }[]
> => {
  const buckets = GuardianARN.filterArns(resources, S3BucketARN);

  return Promise.all(
    buckets.map(async arn => ({
      arn,
      configuration: await fetchS3BucketConfigurationByArn(arn),
    })),
  );
};

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
      e.name === 'ServerSideEncryptionConfigurationNotFoundError'
    ) {
      return undefined;
    }
    throw e;
  }
};

export const fetchAllS3BucketEncryptionConfigurations = async (
  resources: GuardianARN[],
): Promise<
  {
    arn: S3BucketARN;
    configuration:
      | ServerSideEncryptionConfiguration
      | undefined
      | 'noServerSideEncryption';
  }[]
> => {
  const buckets = GuardianARN.filterArns(resources, S3BucketARN);

  return Promise.all(
    buckets.map(async arn => ({
      arn,
      configuration: await fetchS3BucketEncryptionConfigurationByArn(arn),
    })),
  );
};
