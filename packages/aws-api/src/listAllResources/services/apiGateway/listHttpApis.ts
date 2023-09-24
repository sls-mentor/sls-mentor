import { GetApisCommand } from '@aws-sdk/client-apigatewayv2';

import { ApiGatewayHttpApiARN } from '@sls-mentor/arn';

import { apiGatewayV2Client } from 'clients';

export const listApiGatewaysV2 = async (): Promise<ApiGatewayHttpApiARN[]> => {
  const { Items } = await apiGatewayV2Client.send(new GetApisCommand({}));

  const apiGatewaysIds = (Items ?? [])
    .map(({ ApiId }) => ApiId)
    .filter((id): id is string => id !== undefined);

  return apiGatewaysIds.map(ApiGatewayHttpApiARN.fromApiId);
};
