import { GuardianARN } from '../../types';
import { listS3Buckets } from './s3';

export const listAllResources = async (): Promise<GuardianARN[]> => {
  const s3Buckets: S3BucketARN[] = await listS3Buckets();

  return [...s3Buckets];
};
