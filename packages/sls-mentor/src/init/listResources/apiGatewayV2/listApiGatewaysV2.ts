import { GetApisCommand } from '@aws-sdk/client-apigatewayv2';
import { apiGatewayV2Client } from '../../../clients';
import { ApiGatewayV2ApiARN } from '../../../types/arn/apiGatewayV2';

export const listApiGatewaysV2 = async (): Promise<ApiGatewayV2ApiARN[]> => {
  const { Items } = await apiGatewayV2Client.send(new GetApisCommand({}));

  const apiGatewaysIds = (Items ?? [])
    .map(({ ApiId }) => ApiId)
    .filter((id): id is string => id !== undefined);

  return apiGatewaysIds.map(ApiGatewayV2ApiARN.fromApiId);
};
