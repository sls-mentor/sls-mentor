import { paginateGetResources, Resource } from '@aws-sdk/client-api-gateway';

import { ApiGatewayRestApiARN, CustomARN } from '@sls-mentor/arn';

import { apiGatewayClient } from 'clients';

const fetchRestApiGatewayResourcesByArn = async (
  arn: ApiGatewayRestApiARN,
): Promise<Resource[]> => {
  const resources: Resource[] = [];

  for await (const page of paginateGetResources(
    { client: apiGatewayClient },
    { restApiId: arn.getApiId(), embed: ['methods'] },
  )) {
    resources.push(...(page.items ?? []));
  }

  return resources;
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
