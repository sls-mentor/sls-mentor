import compact from 'lodash/compact';
import { GuardianARN, LambdaFunctionARN } from '../../types';
import { fetchAllLambdaPolicies, Policy } from './fetchAllLambdaPolicies';

const ASYNC_AWS_SERVICES = ['events', 's3', 'sqs', 'sns'];

const isLambdaPolicyAsync = (policy: Policy): boolean => {
  const sourceArns = compact(
    policy.Statement?.map(
      statement => statement.Condition?.ArnLike?.['AWS:SourceArn'],
    ),
  ).map(arn => GuardianARN.fromArnString(arn));

  return sourceArns.some(({ service }) => ASYNC_AWS_SERVICES.includes(service));
};

export const fetchAllAsyncLambdasArns = async (
  resources: GuardianARN[],
): Promise<LambdaFunctionARN[]> => {
  const lambdaArns = GuardianARN.filterArns(resources, LambdaFunctionARN);

  const lambdaPolicies = await fetchAllLambdaPolicies(lambdaArns);

  return compact(
    lambdaPolicies
      .filter(({ policy }) => policy && isLambdaPolicyAsync(policy))
      .map(({ arn }) => arn),
  );
};
