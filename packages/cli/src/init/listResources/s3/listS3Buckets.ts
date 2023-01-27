import { ListBucketsCommand } from '@aws-sdk/client-s3';
import { S3BucketARN, s3Client } from 'core';

export const listS3Buckets = async (): Promise<S3BucketARN[]> => {
  const { Buckets } = await s3Client.send(new ListBucketsCommand({}));

  const bucketNames = (Buckets ?? [])
    .map(({ Name }) => Name)
    .filter((name): name is string => name !== undefined);

  return bucketNames.map(S3BucketARN.fromBucketName);
};
