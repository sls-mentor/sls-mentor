import fetchBackupProtectedResourceArns from '../../aws-sdk-helpers/backup/fetchBackupProtectedResourceArns';
import { Rule } from '../../types';

const run: Rule['run'] = async resourceArns => {
  const backupProtectedResourcesArn = await fetchBackupProtectedResourceArns();
  const results = resourceArns
    .filter(arn => arn.service === 'dynamodb')
    .map(arn => ({
      arn,
      success: arn.toString() in backupProtectedResourcesArn,
    }));

  return { results };
};

export const dynamodbBackupConfig: Rule = {
  ruleName: 'DynamoDB: Define a backup configuration',
  errorMessage: 'DynamoDB backup is undefined.',
  run,
  fileName: 'dynamodbBackupConfig',
  categories: ['Stability'],
  level: 3,
  service: 'DynamoDB',
  easyToFix: true,
  severity: 'medium',
};
