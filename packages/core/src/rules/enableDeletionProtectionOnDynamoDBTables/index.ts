import { fetchAllDynamoDBTableConfigurations } from '../../aws-sdk-helpers/dynamodb';
import { Rule } from '../../types';

const run: Rule['run'] = async resourceArns => {
  const dynamoDBTables = await fetchAllDynamoDBTableConfigurations(
    resourceArns,
  );

  const results = dynamoDBTables.map(({ arn, configuration }) => ({
    arn,
    success: configuration.DeletionProtectionEnabled ?? false,
  }));

  return { results };
};

export const enableDeletionProtectionOnDynamoDBTables: Rule = {
  ruleName: 'Enable the Deletion protection on DynamoDB tables',
  errorMessage: 'Deletion protection not enabled on DynamoDB tables',
  run,
  fileName: 'enableDeletionProtectionOnDynamoDBTables',
  categories: ['Security'],
  level: 3,
  service: 'DynamoDB',
  easyToFix: true,
  severity: 'medium',
};
