import { fetchAllRestApiGatewayResources } from '@sls-mentor/aws-api';

import { Rule } from 'types';

const isAuthenticated = (
  resource: Awaited<
    ReturnType<typeof fetchAllRestApiGatewayResources>
  >[number]['resources'][number],
): boolean => {
  const hasAuthorizer = Object.values(resource.resourceMethods!).every(
    method =>
      method.authorizationType !== undefined &&
      method.authorizationType !== 'NONE',
  );

  return hasAuthorizer;
};

const run: Rule['run'] = async resourceArns => {
  const restApiGatewaysResources = await fetchAllRestApiGatewayResources(
    resourceArns,
  );
  const results = restApiGatewaysResources.flatMap(({ arn, resources }) =>
    resources
      .filter(resource => resource.resourceMethods)
      .map(resource => ({
        arn,
        success: isAuthenticated(resource),
        resource: resource.path,
      })),
  );

  return { results };
};

export const noUnauthorizedRestApiGatewaysRoutes: Rule = {
  ruleName: 'Rest Api Gateway: Use Authorized Routes',
  errorMessage: 'Open access Rest Api',
  run,
  fileName: 'noUnauthorizedRestApiGatewaysRoutes',
  categories: ['Security'],
  level: 1,
  service: 'ApiGateway',
  severity: 'critical',
  easyToFix: false,
};
