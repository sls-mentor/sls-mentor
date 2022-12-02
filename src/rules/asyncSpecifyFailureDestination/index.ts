import {
  fetchAllAsyncLambdasArns,
  fetchAllLambdaConfigurations,
  fetchAllLambdaInvokeEventConfigs,
} from '../../aws-sdk-helpers';
import { Category, Rule } from '../../types';

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
      ({ arn: functionArn }) => functionArn.is(arn),
    );

    const hasDlq =
      matchingFunctionConfiguration?.configuration.DeadLetterConfig
        ?.TargetArn !== undefined;

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
