import { fetchAllLambdaConfigurations } from '../../helpers';
import {
  CheckResult,
  ErrorMessages,
  Resource,
  Rule,
  RuleDisplayNames,
} from '../../types';

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
  ruleName: RuleDisplayNames.NO_DEFAULT_MEMORY,
  errorMessage: ErrorMessages.NO_DEFAULT_MEMORY,
  run,
} as Rule;
