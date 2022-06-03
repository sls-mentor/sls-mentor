import { fetchAllLambdaConfigurations } from '../../helpers';
import { CheckResult, Resource, Rule } from '../../types';
import { RuleNames } from '../../types/RuleNames';

const DEFAULT_MEMORY_SIZE = 1024;

const run = async (
  resources: Resource[],
): Promise<{
  results: CheckResult[];
}> => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resources);

  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    memory: lambdaConfiguration.MemorySize,
    success: lambdaConfiguration.MemorySize !== DEFAULT_MEMORY_SIZE,
  }));

  return { results };
};

export default {
  ruleName: RuleNames.NO_DEFAULT_MEMORY,
  errorMessage: 'The following functions have their memory set as default.',
  run,
} as Rule;
