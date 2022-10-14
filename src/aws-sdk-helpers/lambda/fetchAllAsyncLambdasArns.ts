import { ARN, parse } from '@aws-sdk/util-arn-parser';
import compact from 'lodash/compact';
import { fetchAllLambdaPolicies, Policy } from './fetchAllLambdaPolicies';

const ASYNC_AWS_SERVICES = ['events', 's3', 'sqs', 'sns'];

const isLambdaPolicyAsync = (policy: Policy): boolean => {
  const sourceArns = compact(
    policy.Statement?.map(
      statement => statement.Condition?.ArnLike?.['AWS:SourceArn'],
    ),
  );

  return sourceArns.some(sourceArn =>
    ASYNC_AWS_SERVICES.includes(parse(sourceArn).service),
  );
};

export const fetchAllAsyncLambdasArns = async (
  resources: ARN[],
): Promise<string[]> => {
  const lambdaPolicies = await fetchAllLambdaPolicies(resources);

  return compact(
    lambdaPolicies
      .filter(({ policy }) => policy && isLambdaPolicyAsync(policy))
      .map(({ arn }) => arn),
  );
};
