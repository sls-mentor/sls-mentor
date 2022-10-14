import { baseConfigTypeGuard } from '../../configuration/utils/baseConfigTypeGuard';
import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { BaseConfiguration, Category, Rule } from '../../types';

const DEFAULT_MEMORY_SIZE = 1024;

type Configuration = BaseConfiguration;
type NoDefaultMemoryRule = Rule<Configuration>;

const run: NoDefaultMemoryRule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);

  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    memory: lambdaConfiguration.MemorySize,
    success: lambdaConfiguration.MemorySize !== DEFAULT_MEMORY_SIZE,
  }));

  return { results };
};

const rule: NoDefaultMemoryRule = {
  name: 'NO_DEFAULT_MEMORY',
  displayName: 'Lambda: No Default Memory',
  errorMessage: 'The following functions have their memory set as default',
  run,
  fileName: 'noDefaultMemory',
  categories: [Category.GREEN_IT, Category.IT_COSTS],
  configurationTypeGuards: baseConfigTypeGuard,
};

export default rule;
