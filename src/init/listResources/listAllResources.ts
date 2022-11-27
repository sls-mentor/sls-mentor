import { GuardianARN, LambdaFunctionARN, S3BucketARN } from '../../types';
import { listLambdaFunctions } from './lambda';
import { listS3Buckets } from './s3';

export const listAllResources = async (): Promise<GuardianARN[]> => {
  const s3buckets: S3BucketARN[] = await listS3Buckets();
  const lambdaFunctions: LambdaFunctionARN[] = await listLambdaFunctions();

  return [...s3buckets, ...lambdaFunctions];
};
