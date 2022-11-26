import { build } from '@aws-sdk/util-arn-parser';
import {
  fetchAllAsyncLambdasArns,
  fetchAllLambdaConfigurations,
  fetchAllLambdaInvokeEventConfigs,
} from '../../aws-sdk-helpers';
import { Category, LambdaFunctionARN, Rule } from '../../types';

const run: Rule['run'] = async resourceArns => {
  const asyncLambdasArns = await fetchAllAsyncLambdasArns(resourceArns);

  const invokeConfigs = await fetchAllLambdaInvokeEventConfigs(
    asyncLambdasArns,
  );

  const functionsConfigurations = await fetchAllLambdaConfigurations(
    asyncLambdasArns,
  );

  const results = invokeConfigs.map(({ arn, config }) => {
    const hasFailureDestination =
      config?.DestinationConfig?.OnFailure?.Destination !== undefined;

    const matchingFunctionConfiguration = functionsConfigurations.find(
      ({ FunctionName }) =>
        LambdaFunctionARN.fromFunctionName(FunctionName ?? '').is(arn),
    );

    const hasDlq =
      matchingFunctionConfiguration?.DeadLetterConfig?.TargetArn !== undefined;

    return {
      arn: build(arn),
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
