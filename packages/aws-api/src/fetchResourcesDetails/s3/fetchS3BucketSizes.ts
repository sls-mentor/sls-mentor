import {
  CloudWatchClient,
  Datapoint,
  GetMetricStatisticsCommand,
  Statistic,
} from '@aws-sdk/client-cloudwatch';
import { ObjectStorageClass } from '@aws-sdk/client-s3';

import { CustomARN, S3BucketARN } from '@sls-mentor/arn';

import { fetchS3BucketStorageClassByBucketName } from './fetchS3BucketStorageClass';

const client = new CloudWatchClient({});

// See https://docs.aws.amazon.com/AmazonS3/latest/userguide/metrics-dimensions.html for available StorageType valid filters
const S3StorageTypeMap: Record<ObjectStorageClass | 'EXPRESS_ONEZONE', string> =
  {
    [ObjectStorageClass.DEEP_ARCHIVE]: 'DeepArchiveStorage',
    [ObjectStorageClass.GLACIER]: 'GlacierStorage',
    [ObjectStorageClass.GLACIER_IR]: 'GlacierInstantRetrievalStorage',
    [ObjectStorageClass.INTELLIGENT_TIERING]: 'IntelligentTieringStorage',
    [ObjectStorageClass.ONEZONE_IA]: 'OneZoneIAStorage',
    [ObjectStorageClass.OUTPOSTS]: 'StandardStorage',
    [ObjectStorageClass.REDUCED_REDUNDANCY]: 'ReducedRedundancyStorage',
    [ObjectStorageClass.STANDARD]: 'StandardStorage',
    [ObjectStorageClass.STANDARD_IA]: 'StandardIAStorage',
    [ObjectStorageClass.SNOW]: 'StandardStorage',
    EXPRESS_ONEZONE: 'StandardStorage',
  } as const;

const getStorageTypeFromStorageClass = (
  storageClass: ObjectStorageClass | undefined,
): string => {
  if (storageClass === undefined) {
    return S3StorageTypeMap.STANDARD;
  }

  return S3StorageTypeMap[storageClass];
};

const fetchS3BucketSizeByArn = async (
  bucketName: string,
): Promise<Datapoint[] | undefined> => {
  const startTime = new Date();
  startTime.setDate(startTime.getDate() - 4);
  const endTime = new Date();
  endTime.setDate(endTime.getDate() - 3);

  const storageClass = await fetchS3BucketStorageClassByBucketName(bucketName);

  const { Datapoints } = await client.send(
    new GetMetricStatisticsCommand({
      Namespace: 'AWS/S3',
      MetricName: 'BucketSizeBytes',
      Dimensions: [
        {
          Name: 'BucketName',
          Value: bucketName,
        },
        {
          Name: 'StorageType',
          Value: getStorageTypeFromStorageClass(storageClass),
        },
      ],
      StartTime: startTime,
      Statistics: [Statistic.Average],
      EndTime: endTime,
      Period: 86400,
    }),
  );

  if (Datapoints?.length === undefined || Datapoints.length === 0) {
    return undefined;
  }

  return Datapoints;
};

export const fetchAllS3BucketSizes = async (
  resources: CustomARN[],
): Promise<
  {
    arn: S3BucketARN;
    policy: Datapoint[] | undefined;
  }[]
> => {
  const buckets = CustomARN.filterArns(resources, S3BucketARN);

  const policies = await Promise.all(
    buckets.map(async (arn: S3BucketARN) => {
      const s3ARN = S3BucketARN.fromCustomARN(arn);
      const bucketName = s3ARN.getBucketName();

      return {
        arn,
        policy: await fetchS3BucketSizeByArn(bucketName),
      };
    }),
  );

  return policies;
};
