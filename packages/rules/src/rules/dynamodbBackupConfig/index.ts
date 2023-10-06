import { CustomARN, DynamoDBTableARN } from '@sls-mentor/arn';
import { fetchBackupProtectedResourceArns } from '@sls-mentor/aws-api';

import { Rule, Stage } from 'types';

const run: Rule['run'] = async resourceArns => {
  const resourceArnsProtectedByBackup =
    await fetchBackupProtectedResourceArns();

  const dynamodbTableArns = CustomARN.filterArns(
    resourceArns,
    DynamoDBTableARN,
  );

  const results = dynamodbTableArns.map(tableArn => ({
    arn: tableArn,
    success: resourceArnsProtectedByBackup.some(protectedByBackup =>
      protectedByBackup.is(tableArn),
    ),
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
  stages: [Stage.prod],
  service: 'DynamoDB',
  easyToFix: true,
  severity: 'medium',
};
