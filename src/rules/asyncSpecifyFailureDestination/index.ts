import { ARN, parse } from '@aws-sdk/util-arn-parser';
import {
  fetchAllAsyncLambdasArns,
  fetchAllLambdaInvokeEventConfigs,
} from '../../helpers';
import { ErrorMessages, Rule, RuleDisplayNames } from '../../types';

const run = async (resourceArns: ARN[]) => {
  const asyncLambdasArns = await fetchAllAsyncLambdasArns(resourceArns);

  const invokeConfigs = await fetchAllLambdaInvokeEventConfigs(
    asyncLambdasArns.map(parse),
  );

  const results = invokeConfigs.map(({ arn, config }) => ({
    arn,
    success: config?.DestinationConfig?.OnFailure?.Destination !== undefined,
  }));

  return { results };
};

export default {
  ruleName: RuleDisplayNames.ASYNC_NO_FAILURE_DESTINATION,
  errorMessage: ErrorMessages.ASYNC_NO_FAILURE_DESTINATION,
  run,
} as Rule;
