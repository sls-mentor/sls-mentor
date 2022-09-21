import { parse } from '@aws-sdk/util-arn-parser';
import {
  fetchAllAsyncLambdasArns,
  fetchAllLambdaInvokeEventConfigs,
} from '../../helpers';
import { Rule, Rules } from '../../types';

const run: Rule['run'] = async resourceArns => {
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

const rule: Rule = {
  run,
  rule: Rules.ASYNC_SPECIFY_FAILURE_DESTINATION,
};

export default rule;
