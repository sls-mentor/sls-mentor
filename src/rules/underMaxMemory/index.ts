import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { AWS_HISTORICAL_MAX_MEMORY } from '../../constants';
import { fetchAllLambdaConfigurations } from '../../helpers';
import {
  CheckResult,
  ErrorMessages,
  Resource,
  Rule,
  RuleDisplayNames,
} from '../../types';

const hasMemoryUnderMaxMemory = (lambdaConfiguration: FunctionConfiguration) =>
  lambdaConfiguration.MemorySize === undefined ||
  lambdaConfiguration.MemorySize < AWS_HISTORICAL_MAX_MEMORY;
const run = async (
  resources: Resource[],
): Promise<{
  results: CheckResult[];
}> => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resources);

  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    success: hasMemoryUnderMaxMemory(lambdaConfiguration),
    memorySize: lambdaConfiguration.MemorySize,
  }));

  return { results };
};

export default {
  ruleName: RuleDisplayNames.UNDER_MAX_MEMORY,
  errorMessage: ErrorMessages.UNDER_MAX_MEMORY,
  run,
} as Rule;
