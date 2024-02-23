import { GraphqlApi, ListGraphqlApisCommand } from '@aws-sdk/client-appsync';

import { AppSyncApiARN } from '@sls-mentor/arn';

import { appSyncClient } from 'clients';

export const listGraphqlApis = async (): Promise<AppSyncApiARN[]> => {
  const appSyncApis: GraphqlApi[] = [];

  let nextToken: string | undefined;

  do {
    const resources = await appSyncClient.send(
      new ListGraphqlApisCommand({ nextToken }),
    );

    appSyncApis.push(...(resources.graphqlApis ?? []));
    nextToken = resources.nextToken;
  } while (nextToken !== undefined);

  return appSyncApis
    .map(({ apiId }) => apiId)
    .filter((apiId): apiId is string => apiId !== undefined)
    .map(AppSyncApiARN.fromAppSyncApiId);
};
