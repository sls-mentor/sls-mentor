import { GetRoutesCommand, Route } from '@aws-sdk/client-apigatewayv2';
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

export const fetchAllApiGatewayV2Routes = async (
  resourceArns: CustomARN[],
): Promise<
  {
    arn: ApiGatewayV2ApiARN;
    routes: Route[];
  }[]
> => {
  const apiGatewaysV2 = CustomARN.filterArns(resourceArns, ApiGatewayV2ApiARN);

  return Promise.all(
    apiGatewaysV2.map(async arn => ({
      arn,
      routes: await fetchApiGatewayV2RoutesByArn(arn),
    })),
  );
};
