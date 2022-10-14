import { parse } from '@aws-sdk/util-arn-parser';
import { baseConfigTypeGuard } from '../../configuration/utils/baseConfigTypeGuard';
import {
  fetchAllAsyncLambdasArns,
  fetchAllLambdaConfigurations,
  fetchAllLambdaInvokeEventConfigs,
} from '../../aws-sdk-helpers';
import { BaseConfiguration, Category, Rule } from '../../types';

type Configuration = BaseConfiguration;
type SpecifyAsyncFailureRule = Rule<Configuration>;

const run: SpecifyAsyncFailureRule['run'] = async resourceArns => {
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

const rule: SpecifyAsyncFailureRule = {
  name: 'ASYNC_SPECIFY_FAILURE_DESTINATION',
  displayName: 'Lambda: Specify Failure Destination for Async Functions',
  errorMessage:
    'The function is asynchronous but has no failure destination set',
  run,
  fileName: 'asyncSpecifyFailureDestination',
  categories: [Category.STABILITY],
  configurationTypeGuards: baseConfigTypeGuard,
};

export default rule;
