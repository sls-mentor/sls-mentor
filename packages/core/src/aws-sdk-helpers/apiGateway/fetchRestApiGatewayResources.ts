import { GetResourcesCommand, Resource } from '@aws-sdk/client-api-gateway';
import apiGatewayClient from '../../clients/apiGatewayClient';
import { CustomARN, RestApiGatewayApiARN } from '../../types';

const fetchRestApiGatewayResourcesByArn = async (
  arn: RestApiGatewayApiARN,
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
    arn: RestApiGatewayApiARN;
    resources: Resource[];
  }[]
> => {
  const apiGatewaysV1 = CustomARN.filterArns(
    resourceArns,
    RestApiGatewayApiARN,
  );

  return Promise.all(
    apiGatewaysV1.map(async arn => ({
      arn,
      resources: await fetchRestApiGatewayResourcesByArn(arn),
    })),
  );
};
