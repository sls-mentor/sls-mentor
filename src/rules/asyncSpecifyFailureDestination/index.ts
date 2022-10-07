import { parse } from '@aws-sdk/util-arn-parser';
import {
  fetchAllAsyncLambdasArns,
  fetchAllLambdaConfigurations,
  fetchAllLambdaInvokeEventConfigs,
} from '../../helpers';
import { Category, Rule } from '../../types';

const run: Rule['run'] = async resourceArns => {
  const asyncLambdasArns = await fetchAllAsyncLambdasArns(resourceArns);

  const invokeConfigs = await fetchAllLambdaInvokeEventConfigs(
    asyncLambdasArns.map(parse),
  );

  const functionsConfigurations = await fetchAllLambdaConfigurations(
    asyncLambdasArns.map(parse),
  );

  const results = invokeConfigs.map(({ arn, config }) => {
    const hasFailureDestination =
      config?.DestinationConfig?.OnFailure?.Destination !== undefined;

    const matchingFunctionConfiguration = functionsConfigurations.find(
      ({ FunctionArn }) => arn === FunctionArn,
    );
    const hasDlq =
      matchingFunctionConfiguration?.DeadLetterConfig?.TargetArn !== undefined;

    return {
      arn,
      success: hasDlq || hasFailureDestination,
    };
  });

  return { results };
};

const rule: Rule = {
  ruleName: 'Lambda: Specify Failure Destination for Async Functions',
  errorMessage:
    'The function is asynchronous but has no failure destination set',
  run,
  fileName: 'asyncSpecifyFailureDestination',
  categories: [Category.STABILITY],
};

export default rule;
