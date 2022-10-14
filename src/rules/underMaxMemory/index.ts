import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { baseConfigTypeGuard } from '../../configuration/utils/baseConfigTypeGuard';
import { AWS_HISTORICAL_MAX_MEMORY } from '../../constants';
import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { BaseConfiguration, Category, Rule } from '../../types';

type Configuration = BaseConfiguration;
type UnderMaxMemoryRule = Rule<Configuration>;

const hasMemoryUnderMaxMemory = (lambdaConfiguration: FunctionConfiguration) =>
  lambdaConfiguration.MemorySize === undefined ||
  lambdaConfiguration.MemorySize < AWS_HISTORICAL_MAX_MEMORY;

const run: UnderMaxMemoryRule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);

  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    success: hasMemoryUnderMaxMemory(lambdaConfiguration),
    memorySize: lambdaConfiguration.MemorySize,
  }));

  return { results };
};

const rule: UnderMaxMemoryRule = {
  name: 'UNDER_MAX_MEMORY',
  displayName: 'Lambda: Under Maximum Memory',
  errorMessage: `The function's memory is set to the historical maximum limit of ${AWS_HISTORICAL_MAX_MEMORY} MB or higher`,
  run,
  fileName: 'underMaxMemory',
  categories: [Category.GREEN_IT, Category.IT_COSTS],
  configurationTypeGuards: baseConfigTypeGuard,
};

export default rule;
