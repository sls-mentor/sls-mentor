import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from 'aws-sdk-helpers';
import { Rule } from 'types';

const ARM_ARCHITECTURE = 'arm64';

const isArmArchitecture = (
  lambdaConfigurations: FunctionConfiguration,
): boolean =>
  lambdaConfigurations.Architectures
    ? lambdaConfigurations.Architectures[0] === ARM_ARCHITECTURE
    : false;

const run: Rule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);
  const results = lambdaConfigurations.map(({ arn, configuration }) => ({
    arn,
    success: isArmArchitecture(configuration),
  }));

  return { results };
};

export const useArm: Rule = {
  ruleName: 'Lambda: Use an ARM Architecture',
  errorMessage: "The function's architecture is not set as ARM",
  run,
  fileName: 'useArm',
  categories: ['GreenIT', 'ITCosts', 'Speed'],
  level: 1,
  service: 'Lambda',
};
