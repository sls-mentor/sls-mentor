import { CustomARN } from '@sls-mentor/arn';
import { fetchAllRestApiGatewayResources } from '@sls-mentor/aws-api';

import { BaseEdge } from 'edges/types';

import { RestApiWarnings } from './types';

export const getRestApiEdges = async (
  arns: CustomARN[],
): Promise<
  (BaseEdge & {
    warnings: RestApiWarnings[];
  })[]
> => {
  const allRestApiResources = await fetchAllRestApiGatewayResources(arns);

  return allRestApiResources
    .map(({ arn, resources }) =>
      resources.map(resource => {
        const methods = resource.resourceMethods ?? {};

        return Object.entries(methods).map(
          ([, { methodIntegration, authorizationType }]) => {
            const uri = methodIntegration?.uri ?? '';
            const uriArn =
              uri
                .match(/(arn:aws:lambda:.*:.*:function:.*)\//)?.[0]
                ?.slice(0, -1) ?? '*';

            const warnings: RestApiWarnings[] = [];

            if (
              authorizationType === undefined ||
              authorizationType === 'NONE'
            ) {
              warnings.push(RestApiWarnings.RestApiNoAuthorizer);
            }

            return {
              from: arn.toString(),
              to: uriArn,
              warnings,
            };
          },
        );
      }),
    )
    .flat(2);
};
