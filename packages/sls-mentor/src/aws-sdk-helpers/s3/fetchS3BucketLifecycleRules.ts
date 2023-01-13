import {
  GetBucketLifecycleConfigurationCommand,
  LifecycleRule,
  S3ServiceException,
} from '@aws-sdk/client-s3';
import { s3Client } from '../../clients';
import { CustomARN, S3BucketARN } from '../../types';

const fetchS3BucketLifecycleRulesByArn = async (
  arn: S3BucketARN,
): Promise<LifecycleRule[] | undefined> => {
  try {
    const { Rules } = await s3Client.send(
      new GetBucketLifecycleConfigurationCommand({
        Bucket: arn.resource,
      }),
    );

    return Rules;
  } catch (e) {
    if (
      e instanceof S3ServiceException &&
      ['NoSuchLifecycleConfiguration', 'PermanentRedirect'].includes(e.name)
    ) {
      return undefined;
    }
    throw e;
  }
};

export const fetchAllS3BucketLifeCycleRules = async (
  resources: CustomARN[],
): Promise<
  {
    arn: S3BucketARN;
    rules: LifecycleRule[] | undefined;
  }[]
> => {
  const buckets = CustomARN.filterArns(resources, S3BucketARN);

  return Promise.all(
    buckets.map(async arn => ({
      arn,
      rules: await fetchS3BucketLifecycleRulesByArn(arn),
    })),
  );
};
