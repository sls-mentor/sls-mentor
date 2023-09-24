import { GetResourcesCommand, Resource } from '@aws-sdk/client-api-gateway';

import { ApiGatewayRestApiARN, CustomARN } from '@sls-mentor/arn';

import { apiGatewayClient } from 'clients';

const fetchRestApiGatewayResourcesByArn = async (
  arn: ApiGatewayRestApiARN,
): Promise<Resource[]> => {
  const { items } = await apiGatewayClient.send(
    new GetResourcesCommand({ restApiId: arn.getApiId(), embed: ['methods'] }),
  );

  return items ?? [];
};

export const fetchAllRestApiGatewayResources = async (
  resourceArns: CustomARN[],
): Promise<
  {
    arn: ApiGatewayRestApiARN;
    resources: Resource[];
  }[]
> => {
  const apiGatewaysV1 = CustomARN.filterArns(
    resourceArns,
    ApiGatewayRestApiARN,
  );

  return Promise.all(
    apiGatewaysV1.map(async arn => ({
      arn,
      resources: await fetchRestApiGatewayResourcesByArn(arn),
    })),
  );
};
