import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { AWS_HISTORICAL_MAX_MEMORY } from '../../constants';
import { GuardianLevel } from '../../constants/level';
import { Category, Rule } from '../../types';

const hasMemoryUnderMaxMemory = (lambdaConfiguration: FunctionConfiguration) =>
  lambdaConfiguration.MemorySize === undefined ||
  lambdaConfiguration.MemorySize < AWS_HISTORICAL_MAX_MEMORY;

const run: Rule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);

  const results = lambdaConfigurations.map(({ arn, configuration }) => ({
    arn,
    success: hasMemoryUnderMaxMemory(configuration),
    memorySize: configuration.MemorySize,
  }));

  return { results };
};

const rule: Rule = {
  ruleName: 'Lambda: Under Maximum Memory',
  errorMessage: `The function's memory is set to the historical maximum limit of ${AWS_HISTORICAL_MAX_MEMORY} MB or higher`,
  run,
  fileName: 'underMaxMemory',
  categories: [Category.GREEN_IT, Category.IT_COSTS],
  level: GuardianLevel.Level2,
};

export default rule;
