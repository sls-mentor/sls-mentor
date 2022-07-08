import { ARN } from '@aws-sdk/util-arn-parser';

export const filterS3BucketFromResources = (resources: ARN[]): ARN[] =>
  resources.filter(arn => arn.service === 's3');
