import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { Category, Rule } from '../../types';

const ARM_ARCHITECTURE = 'arm64';

const isArmArchitecture = (
  lambdaConfigurations: FunctionConfiguration,
): boolean =>
  lambdaConfigurations.Architectures
    ? lambdaConfigurations.Architectures[0] === ARM_ARCHITECTURE
    : false;

const run: Rule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);
  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    success: isArmArchitecture(lambdaConfiguration),
  }));

  return { results };
};

const rule: Rule = {
  displayName: 'Lambda: Use an ARM Architecture',
  errorMessage: "The function's architecture is not set as ARM",
  run,
  fileName: 'useArm',
  categories: [Category.GREEN_IT, Category.IT_COSTS, Category.SPEED],
};

export default rule;
