import { CustomARN, LambdaFunctionARN } from '@sls-mentor/arn';

import { Policy } from 'types/policy';

import { fetchAllLambdaPolicies } from './fetchAllLambdaPolicies';

const ASYNC_AWS_SERVICES = ['events', 's3', 'sqs', 'sns'];

const isLambdaPolicyAsync = (policy: Policy): boolean => {
  const sourceArns = (policy.Statement ?? [])
    .map(statement => statement.Condition?.ArnLike?.['AWS:SourceArn'])
    .filter((arn): arn is string => arn !== undefined)
    .map(arn => CustomARN.fromArnString(arn))
    .filter((arn): arn is CustomARN => arn !== undefined);

  return sourceArns.some(({ service }) => ASYNC_AWS_SERVICES.includes(service));
};

export const fetchAllAsyncLambdasArns = async (
  resources: CustomARN[],
): Promise<LambdaFunctionARN[]> => {
  const lambdaArns = CustomARN.filterArns(resources, LambdaFunctionARN);

  const lambdaPolicies = await fetchAllLambdaPolicies(lambdaArns);

  return lambdaPolicies
    .filter(({ policy }) => policy !== undefined && isLambdaPolicyAsync(policy))
    .map(({ arn }) => arn);
};
