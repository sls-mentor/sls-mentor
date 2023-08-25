import { paginateListTables } from '@aws-sdk/client-dynamodb';
import { dynamodbClient, DynamoDBTableARN } from '@sls-mentor/core';

export const listDynamoDBTables = async (): Promise<DynamoDBTableARN[]> => {
  const dynamodbTables: string[] = [];

  for await (const resources of paginateListTables(
    { client: dynamodbClient },
    {},
  )) {
    dynamodbTables.push(...(resources.TableNames ?? []));
  }

  return dynamodbTables.map(tableName =>
    DynamoDBTableARN.fromTableName(tableName),
  );
};
