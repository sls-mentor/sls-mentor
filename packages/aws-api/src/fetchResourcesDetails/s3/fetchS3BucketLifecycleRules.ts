import {
  GetBucketLifecycleConfigurationCommand,
  LifecycleRule,
  S3ServiceException,
} from '@aws-sdk/client-s3';

import { CustomARN, S3BucketARN } from '@sls-mentor/arn';

import { s3Client } from 'clients';

const fetchS3BucketLifecycleRulesByArn = async (
  arn: S3BucketARN,
): Promise<LifecycleRule[] | undefined> => {
  try {
    const { Rules } = await s3Client.send(
      new GetBucketLifecycleConfigurationCommand({
        Bucket: arn.resource,
        // @ts-expect-error CachePlugin doesn't differentiate S3 commands, so we need to add a command name
        // https://github.com/aws/aws-sdk-js-v3/issues/5593
        commandName: 'GetBucketLifecycleConfigurationCommand',
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
