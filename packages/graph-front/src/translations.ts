import { RankingKey } from './types';

const resourceTranslation = {
  lambdaFunction: 'Lambda functions',
  dynamodbTable: 'DynamoDB tables',
  s3Bucket: 'S3 buckets',
};

export const rankingResourceTranslation: Record<RankingKey, string> = {
  averageColdStartDuration: resourceTranslation.lambdaFunction,
  maxColdStartDuration: resourceTranslation.lambdaFunction,
  coldStartPercentage: resourceTranslation.lambdaFunction,
  memorySize: resourceTranslation.lambdaFunction,
  bundleSize: resourceTranslation.lambdaFunction,
  timeout: resourceTranslation.lambdaFunction,
  averageDuration: resourceTranslation.lambdaFunction,
  maxDuration: resourceTranslation.lambdaFunction,
  averageMemoryUsed: resourceTranslation.lambdaFunction,
  percentageMemoryUsed: resourceTranslation.lambdaFunction,
  itemCount: resourceTranslation.dynamodbTable,
  tableSize: resourceTranslation.dynamodbTable,
  averageItemSize: resourceTranslation.dynamodbTable,
  bucketSize: resourceTranslation.s3Bucket,
};

export const rankingKeyTranslation: Record<RankingKey, string> = {
  averageColdStartDuration: 'Average Cold Start Duration',
  maxColdStartDuration: 'Max Cold Start Duration',
  coldStartPercentage: 'Cold Start Percentage',
  memorySize: 'Memory Size',
  bundleSize: 'Bundle Size',
  timeout: 'Timeout',
  averageDuration: 'Average Duration',
  maxDuration: 'Max Duration',
  averageMemoryUsed: 'Average Memory Used',
  percentageMemoryUsed: 'Percentage Memory Used',
  itemCount: 'Item Count',
  tableSize: 'Table Size',
  averageItemSize: 'Average Item Size',
  bucketSize: 'Bucket Size',
};

export const rankingUnitTranslation: Record<RankingKey, string> = {
  averageColdStartDuration: 'ms',
  maxColdStartDuration: 'ms',
  coldStartPercentage: '%',
  memorySize: 'MB',
  bundleSize: 'MB',
  timeout: 's',
  averageDuration: 'ms',
  maxDuration: 'ms',
  averageMemoryUsed: 'MB',
  percentageMemoryUsed: '%',
  itemCount: 'items',
  tableSize: 'MB',
  averageItemSize: 'kB',
  bucketSize: 'kB',
};
