import { paginateListTables } from '@aws-sdk/client-dynamodb';

import { DynamoDBTableARN } from '@sls-mentor/arn';

import { dynamoDbClient } from 'clients';

export const listDynamoDBTables = async (): Promise<DynamoDBTableARN[]> => {
  const dynamodbTables: string[] = [];

  for await (const resources of paginateListTables(
    { client: dynamoDbClient },
    {},
  )) {
    dynamodbTables.push(...(resources.TableNames ?? []));
  }

  return dynamodbTables.map(tableName =>
    DynamoDBTableARN.fromTableName(tableName),
  );
};
