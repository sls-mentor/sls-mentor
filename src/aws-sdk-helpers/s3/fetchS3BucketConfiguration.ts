import {
  GetBucketEncryptionCommand,
  IntelligentTieringConfiguration,
  ListBucketIntelligentTieringConfigurationsCommand,
  S3ServiceException,
  ServerSideEncryptionConfiguration,
} from '@aws-sdk/client-s3';
import { ARN } from '@aws-sdk/util-arn-parser';
import { s3Client } from '../../clients';
import { filterServiceFromResourceArns } from '../common';

const fetchS3BucketIntelligentTieringConfigurationByArn = async (
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
  const buckets = filterServiceFromResourceArns(resources, 's3');

  return Promise.all(
    buckets.map(async arn => ({
      arn,
      configuration: await fetchS3BucketIntelligentTieringConfigurationByArn(
        arn,
      ),
    })),
  );
};

const fetchS3BucketEncryptionConfigurationByArn = async (
  arn: ARN,
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
  resources: ARN[],
): Promise<
  {
    arn: ARN;
    configuration:
      | ServerSideEncryptionConfiguration
      | undefined
      | 'noServerSideEncryption';
  }[]
> => {
  const buckets = filterServiceFromResourceArns(resources, 's3');

  return Promise.all(
    buckets.map(async arn => ({
      arn,
      configuration: await fetchS3BucketEncryptionConfigurationByArn(arn),
    })),
  );
};
