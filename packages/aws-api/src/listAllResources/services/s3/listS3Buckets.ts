import {
  GetBucketLocationCommand,
  ListBucketsCommand,
} from '@aws-sdk/client-s3';

import { S3BucketARN } from '@sls-mentor/arn';

import { s3Client } from 'clients';

export const listS3Buckets = async ({
  region,
}: {
  region: string;
}): Promise<S3BucketARN[]> => {
  try {
    const { Buckets } = await s3Client.send(
      new ListBucketsCommand({
        // CachePlugin doesn't differentiate S3 commands, so we need to add a command name
        // https://github.com/aws/aws-sdk-js-v3/issues/5593
        commandName: 'ListBucketsCommand',
      }),
    );

    const bucketNames = (Buckets ?? [])
      .map(({ Name }) => Name)
      .filter((name): name is string => name !== undefined);

    const bucketArns: S3BucketARN[] = [];
    for (const bucketName of bucketNames) {
      const { LocationConstraint } = await s3Client.send(
        new GetBucketLocationCommand({
          Bucket: bucketName,
          // @ts-expect-error CachePlugin doesn't differentiate S3 commands, so we need to add a command name
          // https://github.com/aws/aws-sdk-js-v3/issues/5593
          commandName: 'GetBucketLocationCommand',
        }),
      );
      if (LocationConstraint === region) {
        bucketArns.push(S3BucketARN.fromBucketName(bucketName));
      }
    }

    return bucketArns;
  } catch (e) {
    // Bucket does not match region
    console.log('There was an issue while getting S3Buckets: ', {
      e,
    });

    return [];
  }
};
