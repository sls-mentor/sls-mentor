import compact from 'lodash/compact';
import { CustomARN, LambdaFunctionARN } from 'types';
import type { Policy } from './fetchAllLambdaPolicies';
import { fetchAllLambdaPolicies } from './fetchAllLambdaPolicies';

const ASYNC_AWS_SERVICES = ['events', 's3', 'sqs', 'sns'];

const isLambdaPolicyAsync = (policy: Policy): boolean => {
  const sourceArns = compact(
    policy.Statement?.map(
      statement => statement.Condition?.ArnLike?.['AWS:SourceArn'],
    ),
  ).map(arn => CustomARN.fromArnString(arn));

  return sourceArns.some(({ service }) => ASYNC_AWS_SERVICES.includes(service));
};

export const fetchAllAsyncLambdasArns = async (
  resources: CustomARN[],
): Promise<LambdaFunctionARN[]> => {
  const lambdaArns = CustomARN.filterArns(resources, LambdaFunctionARN);

  const lambdaPolicies = await fetchAllLambdaPolicies(lambdaArns);

  return compact(
    lambdaPolicies
      .filter(({ policy }) => policy && isLambdaPolicyAsync(policy))
      .map(({ arn }) => arn),
  );
};
