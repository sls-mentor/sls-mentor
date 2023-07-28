import { GetRestApisCommand } from '@aws-sdk/client-api-gateway';
import {
  apiGatewayClient,
  ApiGatewayV2ApiARN,
  RestApiGatewayApiARN,
} from '@sls-mentor/core';

export const listRestApiGateways = async (): Promise<ApiGatewayV2ApiARN[]> => {
  const { items } = await apiGatewayClient.send(new GetRestApisCommand({}));

  const apiGatewaysIds = (items ?? [])
    .map(({ id }) => id)
    .filter((id): id is string => id !== undefined);

  return apiGatewaysIds.map(RestApiGatewayApiARN.fromApiId);
};
