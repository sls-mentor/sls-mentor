import { GetApisCommand } from '@aws-sdk/client-apigatewayv2';
import { ApiGatewayV2ApiARN, apiGatewayV2Client } from 'core';

export const listApiGatewaysV2 = async (): Promise<ApiGatewayV2ApiARN[]> => {
  const { Items } = await apiGatewayV2Client.send(new GetApisCommand({}));

  const apiGatewaysIds = (Items ?? [])
    .map(({ ApiId }) => ApiId)
    .filter((id): id is string => id !== undefined);

  return apiGatewaysIds.map(ApiGatewayV2ApiARN.fromApiId);
};
