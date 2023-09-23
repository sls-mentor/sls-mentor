import {
  EventSourceMappingConfiguration,
  ListEventSourceMappingsCommand,
} from '@aws-sdk/client-lambda';

import { CustomARN, LambdaFunctionARN } from '@sls-mentor/arn';

import { lambdaClient } from 'clients';

const fetchLambdaEventSourceMappings = async (
  arn: LambdaFunctionARN,
): Promise<{
  arn: LambdaFunctionARN;
  eventSourceMappings: EventSourceMappingConfiguration[];
}> => {
  const { EventSourceMappings } = await lambdaClient.send(
    new ListEventSourceMappingsCommand({
      FunctionName: arn.getFunctionName(),
    }),
  );

  return {
    arn,
    eventSourceMappings: EventSourceMappings ?? [],
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
