import {
  GetBucketLocationCommand,
  ListBucketsCommand,
} from '@aws-sdk/client-s3';

import { S3BucketARN } from '@sls-mentor/arn';

import { s3Client } from 'clients';

export const listS3Buckets = async (): Promise<S3BucketARN[]> => {
  const { Buckets } = await s3Client.send(new ListBucketsCommand({}));

  const bucketNames = (Buckets ?? [])
    .map(({ Name }) => Name)
    .filter((name): name is string => name !== undefined);

  const bucketArns: S3BucketARN[] = [];

  try {
    for (const bucketName of bucketNames) {
      const { LocationConstraint } = await s3Client.send(
        new GetBucketLocationCommand({ Bucket: bucketName }),
      );
      if (LocationConstraint === process.env.AWS_REGION) {
        bucketArns.push(S3BucketARN.fromBucketName(bucketName));
      }
    }
  } catch {
    // Bucket does not match region
  }

  return bucketArns;
};
