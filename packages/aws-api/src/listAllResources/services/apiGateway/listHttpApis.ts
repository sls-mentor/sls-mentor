import {
  AccessDeniedException,
  GetApisCommand,
} from '@aws-sdk/client-apigatewayv2';

import { ApiGatewayHttpApiARN } from '@sls-mentor/arn';

import { apiGatewayV2Client } from 'clients';

export const listApiGatewaysV2 = async (): Promise<ApiGatewayHttpApiARN[]> => {
  const { Items } = await apiGatewayV2Client.send(new GetApisCommand({}));

  try {
    const apiGatewaysIds = (Items ?? [])
      .map(({ ApiId }) => ApiId)
      .filter((id): id is string => id !== undefined);

    return apiGatewaysIds.map(ApiGatewayHttpApiARN.fromApiId);
  } catch (e) {
    if (e instanceof AccessDeniedException) {
      console.log(
        '403: You are not allowed to request ApiGatewayHttpApi, this resource will be ignored in the report',
      );

      return [];
    }
    console.log('There was an issue while getting ApiGatewayHttpApi: ', {
      e,
    });

    return [];
  }
};
