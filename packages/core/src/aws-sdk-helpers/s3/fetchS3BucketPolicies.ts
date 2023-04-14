import { GetBucketPolicyCommand, S3ServiceException } from '@aws-sdk/client-s3';
import { s3Client } from 'clients';
import { CustomARN, S3BucketARN } from 'types';
interface S3BucketPolicyStatementItem {
  Sid: string;
  Action: string;
  Effect: string;
  Resource: string[];
  Condition: {
    Bool: {
      'aws:SecureTransport': string;
    };
  };
  Principal: string;
}
export interface S3BucketPolicy {
  Id: string;
  Version: string;
  Statement: S3BucketPolicyStatementItem[];
}

const fetchS3BucketPolicyByArn = async (
  arn: S3BucketARN,
): Promise<S3BucketPolicy | undefined> => {
  try {
    const { Policy: rawPolicy } = await s3Client.send(
      new GetBucketPolicyCommand({
        Bucket: arn.resource,
      }),
    );
    if (rawPolicy === undefined) {
      return undefined;
    }

    return JSON.parse(rawPolicy) as S3BucketPolicy;
  } catch (e) {
    if (
      e instanceof S3ServiceException &&
      ['NoSuchBucketPolicy', 'PermanentRedirect'].includes(e.name)
    ) {
      return undefined;
    }
    throw e;
  }
};

export const fetchAllS3BucketPolicies = async (
  resources: CustomARN[],
): Promise<
  | {
      arn: S3BucketARN;
      policy: S3BucketPolicy | undefined;
    }[]
> => {
  const buckets = CustomARN.filterArns(resources, S3BucketARN);

  const policies = await Promise.all(
    buckets.map(async arn => ({
      arn,
      policy: await fetchS3BucketPolicyByArn(arn),
    })),
  );

  return policies;
};
