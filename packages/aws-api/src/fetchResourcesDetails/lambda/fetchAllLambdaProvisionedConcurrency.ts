import {
  ListProvisionedConcurrencyConfigsCommand,
  ProvisionedConcurrencyConfigListItem,
} from '@aws-sdk/client-lambda';

import { CustomARN, LambdaFunctionARN } from '@sls-mentor/arn';

import { lambdaClient } from 'clients';

const fetchLambdaProvisionedConcurrency = async (
  arn: LambdaFunctionARN,
): Promise<{
  arn: LambdaFunctionARN;
  provisionedConcurrency: ProvisionedConcurrencyConfigListItem[];
}> => {
  const concurrency = await lambdaClient.send(
    new ListProvisionedConcurrencyConfigsCommand({
      FunctionName: arn.getFunctionName(),
    }),
  );

  return {
    arn,
    provisionedConcurrency: concurrency.ProvisionedConcurrencyConfigs ?? [],
  };
};

export const fetchAllLambdaProvisionedConcurrency = async (
  resources: CustomARN[],
): Promise<
  {
    arn: LambdaFunctionARN;
    provisionedConcurrency: ProvisionedConcurrencyConfigListItem[];
  }[]
> => {
  const lambdas = CustomARN.filterArns(resources, LambdaFunctionARN);

  return await Promise.all(
    lambdas.map(arn => fetchLambdaProvisionedConcurrency(arn)),
  );
};
