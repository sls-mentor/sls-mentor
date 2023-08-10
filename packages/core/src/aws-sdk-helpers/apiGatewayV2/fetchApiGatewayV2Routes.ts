import { GetRoutesCommand, GetApiCommand, Route, ProtocolType } from '@aws-sdk/client-apigatewayv2';
import apiGatewayV2Client from '../../clients/apiGatewayV2Client';
import { ApiGatewayV2ApiARN, CustomARN } from '../../types';

const fetchApiGatewayV2RoutesByArn = async (
  arn: ApiGatewayV2ApiARN,
): Promise<Route[]> => {
  const { Items } = await apiGatewayV2Client.send(
    new GetRoutesCommand({ ApiId: arn.getApiId() }),
  );

  return Items ?? [];
};

const fetchApiGatewayProtocolTypeByArn = async (
  arn: ApiGatewayV2ApiARN,
): Promise<ProtocolType> => {
  const { ProtocolType: protocolType } = await apiGatewayV2Client.send(
    new GetApiCommand({ ApiId: arn.getApiId() }),
  );
  return protocolType! as ProtocolType;
};

export const fetchAllApiGatewayV2Routes = async (
  resourceArns: CustomARN[],
): Promise<
  {
    arn: ApiGatewayV2ApiARN;
    routes: Route[];
    protocol: ProtocolType;
  }[]
> => {
  const apiGatewaysV2 = CustomARN.filterArns(resourceArns, ApiGatewayV2ApiARN);

  return Promise.all(
    apiGatewaysV2.map(async arn => {
      return {
        arn,
        routes: await fetchApiGatewayV2RoutesByArn(arn),
        protocol: await fetchApiGatewayProtocolTypeByArn(arn),
      }
    }),
  );
};
