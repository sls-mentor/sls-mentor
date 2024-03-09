import { ListObjectsV2Command, ObjectStorageClass } from '@aws-sdk/client-s3';

import { s3Client } from 'clients';

export const fetchS3BucketStorageClassByBucketName = async (
  bucketName: string,
): Promise<ObjectStorageClass | undefined> => {
  const { Contents } = await s3Client.send(
    new ListObjectsV2Command({ Bucket: bucketName, MaxKeys: 1 }),
  );

  if (Contents === undefined || Contents[0] === undefined) {
    return undefined;
  }

  const StorageClass = Contents[0].StorageClass as ObjectStorageClass;

  return StorageClass;
};
