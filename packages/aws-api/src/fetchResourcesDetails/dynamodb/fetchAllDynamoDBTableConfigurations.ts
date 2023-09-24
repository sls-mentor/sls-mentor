import {
  DescribeTableCommand,
  TableDescription,
} from '@aws-sdk/client-dynamodb';

import { CustomARN, DynamoDBTableARN } from '@sls-mentor/arn';

import { dynamoDbClient } from 'clients';

const fetchDynamoDBTableConfigurationByArn = async (
  arn: DynamoDBTableARN,
): Promise<{
  arn: DynamoDBTableARN;
  configuration: TableDescription;
}> => {
  const tableOutput = await dynamoDbClient.send(
    new DescribeTableCommand({
      TableName: arn.getTableName(),
    }),
  );

  return {
    arn,
    configuration: tableOutput.Table ?? {},
  };
};

export const fetchAllDynamoDBTableConfigurations = async (
  resources: CustomARN[],
): Promise<
  {
    arn: DynamoDBTableARN;
    configuration: TableDescription;
  }[]
> => {
  const tables = CustomARN.filterArns(resources, DynamoDBTableARN);

  return await Promise.all(
    tables.map(arn => fetchDynamoDBTableConfigurationByArn(arn)),
  );
};
