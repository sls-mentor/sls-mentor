import { Route, ProtocolType } from '@aws-sdk/client-apigatewayv2';
import compact from 'lodash/compact';
import { fetchAllApiGatewayV2Routes } from '../../aws-sdk-helpers';
import { Rule } from '../../types';

const isAuthenticated = (route: Route, protocol: ProtocolType): boolean => {
  if (protocol === 'WEBSOCKET' && route.RouteKey !== '$connect') {
    // only $connect can have an authorizer for websocket routes
    return true
  } else {
    const hasAuthorizer =
      route.AuthorizationType !== undefined && route.AuthorizationType !== 'NONE';

    return hasAuthorizer;
  }
};

const run: Rule['run'] = async resourceArns => {
  const apiGatewaysV2Routes = await fetchAllApiGatewayV2Routes(resourceArns);
  const results = compact(
    apiGatewaysV2Routes.flatMap(({ arn, routes, protocol }) =>
      routes.map(route => ({
        arn,
        success: isAuthenticated(route, protocol),
        route: route.RouteKey,
      })),
    ),
  );

  return { results };
};

export const noUnauthorizedApiGatewaysV2Routes: Rule = {
  ruleName: 'Api Gateway V2: Use Authorized Routes',
  errorMessage: 'Route is not authorized',
  run,
  fileName: 'noUnauthorizedApiGatewaysV2Routes',
  categories: ['Security'],
  level: 5,
  service: 'ApiGateway',
  easyToFix: false,
  severity: 'high',
};
