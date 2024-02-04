import { CustomARN } from '@sls-mentor/arn';
import { fetchAllApiGatewayV2Integrations } from '@sls-mentor/aws-api';

import { BaseEdge } from 'edges/types';

import { HttpApiWarnings } from './types';

export const getHttpApiEdges = async (
  arns: CustomARN[],
): Promise<
  (BaseEdge & {
    warnings: HttpApiWarnings[];
  })[]
> => {
  const allHttpApiIntegrations = await fetchAllApiGatewayV2Integrations(arns);

  return allHttpApiIntegrations
    .map(({ arn, targets }) =>
      targets.map(({ uri, authorizationType }) => {
        const warnings: HttpApiWarnings[] = [];

        if (authorizationType === undefined || authorizationType === 'NONE') {
          warnings.push(HttpApiWarnings.HttpApiNoAuthorizer);
        }

        return {
          from: arn.toString(),
          to: uri,
          warnings,
        };
      }),
    )
    .flat();
};
