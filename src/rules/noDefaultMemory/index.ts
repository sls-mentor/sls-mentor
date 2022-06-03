import { fetchAllLambdaConfigurations } from '../../helpers';
import { CheckResult, Resource, Rule } from '../../types';

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
  ruleName: 'No default memory',
  errorMessage: 'The following functions have their memory set as default.',
  run,
} as Rule;
