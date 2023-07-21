import { paginateListTables } from '@aws-sdk/client-dynamodb';
import { dynamoDBClient, DynamoDBTableARN } from '@sls-mentor/core';

export const listDynamoDBTables = async (): Promise<DynamoDBTableARN[]> => {
  const dynamodbTables: string[] = [];

  for await (const resources of paginateListTables(
    { client: dynamoDBClient },
    {},
  )) {
    dynamodbTables.push(...(resources.TableNames ?? []));
  }

  return dynamodbTables.map(tableName =>
    DynamoDBTableARN.fromTableName(tableName),
  );
};
