import { Resource } from '../types';

export const filterS3BucketFromResources = (
  resources: Resource[],
): Resource[] => resources.filter(({ arn }) => arn.service === 's3');
