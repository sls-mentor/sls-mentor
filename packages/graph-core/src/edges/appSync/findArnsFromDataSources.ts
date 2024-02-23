/* eslint-disable complexity */
import { DynamoDBTableARN } from '@sls-mentor/arn';
import { fetchAllGraphqlApiResources } from '@sls-mentor/aws-api';

type DataSources = Awaited<
  ReturnType<typeof fetchAllGraphqlApiResources>
>[number]['dataSources'];

export const findArnsFromDataSources: (
  dataSources: DataSources,
) => string[] = dataSources => {
  const arns: string[] = [];

  for (const dataSource of dataSources) {
    switch (dataSource.type) {
      case 'AWS_LAMBDA':
        {
          if (dataSource.lambdaConfig?.lambdaFunctionArn !== undefined) {
            arns.push(dataSource.lambdaConfig.lambdaFunctionArn);
          }
        }
        break;
      case 'AMAZON_DYNAMODB':
        {
          if (dataSource.dynamodbConfig?.tableName !== undefined) {
            arns.push(
              DynamoDBTableARN.fromTableName(
                dataSource.dynamodbConfig.tableName,
              ).toString(),
            );
          }
        }
        break;
      case 'AMAZON_EVENTBRIDGE':
        {
          if (dataSource.eventBridgeConfig?.eventBusArn !== undefined) {
            arns.push(dataSource.eventBridgeConfig.eventBusArn);
          }
        }
        break;
      case 'RELATIONAL_DATABASE':
        {
          if (
            dataSource.relationalDatabaseConfig?.rdsHttpEndpointConfig
              ?.dbClusterIdentifier !== undefined
          ) {
            arns.push(
              dataSource.relationalDatabaseConfig.rdsHttpEndpointConfig
                .dbClusterIdentifier,
            );
          }
        }
        break;
      default:
        break;
    }
  }

  return arns;
};
