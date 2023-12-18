import {
  GetApiCommand,
  GetRoutesCommand,
  ProtocolType,
  Route,
} from '@aws-sdk/client-apigatewayv2';

import { ApiGatewayHttpApiARN, CustomARN } from '@sls-mentor/arn';

import { apiGatewayV2Client } from 'clients';

const fetchApiGatewayV2RoutesByArn = async (
  arn: ApiGatewayHttpApiARN,
): Promise<Route[]> => {
  const routes: Route[] = [];

  let nextToken: string | undefined;

  do {
    const { Items, NextToken } = await apiGatewayV2Client.send(
      new GetRoutesCommand({
        ApiId: arn.getApiId(),
        NextToken: nextToken,
      }),
    );

    routes.push(...(Items ?? []));

    nextToken = NextToken;
  } while (nextToken !== undefined);

  return routes;
};

const fetchApiGatewayProtocolTypeByArn = async (
  arn: ApiGatewayHttpApiARN,
): Promise<ProtocolType> => {
  const { ProtocolType: protocolType } = await apiGatewayV2Client.send(
    new GetApiCommand({ ApiId: arn.getApiId() }),
  );

  return protocolType as ProtocolType;
};

export const fetchAllApiGatewayV2Routes = async (
  resourceArns: CustomARN[],
): Promise<
  {
    arn: ApiGatewayHttpApiARN;
    routes: Route[];
    protocol: ProtocolType;
  }[]
> => {
  const apiGatewaysV2 = CustomARN.filterArns(
    resourceArns,
    ApiGatewayHttpApiARN,
  );

  return Promise.all(
    apiGatewaysV2.map(async arn => {
      return {
        arn,
        routes: await fetchApiGatewayV2RoutesByArn(arn),
        protocol: await fetchApiGatewayProtocolTypeByArn(arn),
      };
    }),
  );
};
