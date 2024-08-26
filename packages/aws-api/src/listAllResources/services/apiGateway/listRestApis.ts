import { GetRestApisCommand } from '@aws-sdk/client-api-gateway';

import { ApiGatewayRestApiARN } from '@sls-mentor/arn';

import { apiGatewayClient } from 'clients';

export const listRestApiGateways = async (): Promise<
  ApiGatewayRestApiARN[]
> => {
  try {
    const { items } = await apiGatewayClient.send(new GetRestApisCommand({}));

    const apiGatewaysIds = (items ?? [])
      .map(({ id }) => id)
      .filter((id): id is string => id !== undefined);

    return apiGatewaysIds.map(ApiGatewayRestApiARN.fromApiId);
  } catch (e) {
    console.log('There was an issue while getting ApiGatewayRestApis: ', {
      e,
    });

    return [];
  }
};
