import { DataSource, ListDataSourcesCommand } from '@aws-sdk/client-appsync';

import { AppSyncApiARN, CustomARN } from '@sls-mentor/arn';

import { appSyncClient } from 'clients';

export const fetchApiDataSourcesByArn = async (
  arn: AppSyncApiARN,
): Promise<{
  arn: AppSyncApiARN;
  dataSources: DataSource[];
}> => {
  const apiId = AppSyncApiARN.getApiId(arn);

  return {
    arn: arn,
    dataSources:
      (
        await appSyncClient.send(
          new ListDataSourcesCommand({
            apiId,
          }),
        )
      ).dataSources ?? [],
  };
};

export const fetchAllGraphqlApiResources = async (
  resourceArns: CustomARN[],
): Promise<
  {
    arn: AppSyncApiARN;
    dataSources: DataSource[];
  }[]
> => {
  const graphqlApis = CustomARN.filterArns(resourceArns, AppSyncApiARN);

  const AttributesByArn = await Promise.all(
    graphqlApis.map(arn => fetchApiDataSourcesByArn(arn)),
  );

  return AttributesByArn;
};
