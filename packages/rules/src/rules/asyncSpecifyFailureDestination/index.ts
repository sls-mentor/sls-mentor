import {
  fetchAllAsyncLambdasArns,
  fetchAllLambdaConfigurations,
  fetchAllLambdaInvokeEventConfigs,
} from '@sls-mentor/aws-api';

import { Rule, Stage } from 'types';

const run: Rule['run'] = async resourceArns => {
  const asyncLambdasArns = await fetchAllAsyncLambdasArns(resourceArns);

  const invokeConfigs =
    await fetchAllLambdaInvokeEventConfigs(asyncLambdasArns);

  const functionsConfigurations =
    await fetchAllLambdaConfigurations(asyncLambdasArns);

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

export const asyncSpecifyFailureDestination: Rule = {
  ruleName: 'Lambda: Specify Failure Destination for Async Functions',
  errorMessage:
    'The function is asynchronous but has no failure destination set',
  run,
  fileName: 'asyncSpecifyFailureDestination',
  categories: ['Stability'],
  level: 5,
  stages: [Stage.prod, Stage.dev],
  service: 'Lambda',
  easyToFix: false,
  severity: 'medium',
};
