import {
  EventSourceMappingConfiguration,
  paginateListEventSourceMappings,
} from '@aws-sdk/client-lambda';

import { CustomARN, LambdaFunctionARN } from '@sls-mentor/arn';

import { lambdaClient } from 'clients';

const fetchLambdaEventSourceMappings = async (
  arn: LambdaFunctionARN,
): Promise<{
  arn: LambdaFunctionARN;
  eventSourceMappings: EventSourceMappingConfiguration[];
}> => {
  const eventSourceMappings: EventSourceMappingConfiguration[] = [];

  for await (const eventSourceMapping of paginateListEventSourceMappings(
    {
      client: lambdaClient,
    },
    { FunctionName: arn.getFunctionName() },
  )) {
    eventSourceMappings.push(...(eventSourceMapping.EventSourceMappings ?? []));
  }

  return {
    arn,
    eventSourceMappings,
  };
};

export const fetchAllLambdaEventSourceMappings = async (
  resources: CustomARN[],
): Promise<
  {
    arn: LambdaFunctionARN;
    eventSourceMappings: EventSourceMappingConfiguration[];
  }[]
> => {
  const lambdas = CustomARN.filterArns(resources, LambdaFunctionARN);

  return await Promise.all(
    lambdas.map(arn => fetchLambdaEventSourceMappings(arn)),
  );
};
