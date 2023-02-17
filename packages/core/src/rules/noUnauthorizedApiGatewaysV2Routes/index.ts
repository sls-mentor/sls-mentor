import { Route } from '@aws-sdk/client-apigatewayv2';
import compact from 'lodash/compact';
import { fetchAllApiGatewayV2Routes } from '../../aws-sdk-helpers';
import { Rule } from '../../types';

const isAuthenticated = (route: Route): boolean => {
  const hasAuthorizer =
    route.AuthorizationType !== undefined && route.AuthorizationType !== 'NONE';

  return hasAuthorizer;
};

const run: Rule['run'] = async resourceArns => {
  const apiGatewaysV2Routes = await fetchAllApiGatewayV2Routes(resourceArns);
  const results = compact(
    apiGatewaysV2Routes.flatMap(({ arn, routes }) =>
      routes.map(route => ({
        arn,
        success: isAuthenticated(route),
        route: route.RouteKey,
      })),
    ),
  );

  return { results };
};

const rule: Rule = {
  ruleName: 'Api Gateway V2: Use Authorized Routes',
  errorMessage: 'Route is not authorized',
  run,
  fileName: 'noUnauthorizedApiGatewaysV2Routes',
  categories: ['Security'],
  level: 5,
};

export default rule;
