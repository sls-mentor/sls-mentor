import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { Rule } from '../../types';

const DEFAULT_MEMORY_SIZE = 1024;

const run: Rule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);

  const results = lambdaConfigurations.map(({ arn, configuration }) => ({
    arn,
    memory: configuration.MemorySize,
    success: configuration.MemorySize !== DEFAULT_MEMORY_SIZE,
  }));

  return { results };
};

export const noDefaultMemory: Rule = {
  ruleName: 'Lambda: No Default Memory',
  errorMessage: 'The following functions have their memory set as default',
  run,
  fileName: 'noDefaultMemory',
  categories: ['GreenIT', 'ITCosts'],
  level: 3,
  service: 'Lambda',
  easyToFix: true,
  severity: 'low',
};
