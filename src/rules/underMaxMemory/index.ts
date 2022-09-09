import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { ARN } from '@aws-sdk/util-arn-parser';
import { AWS_HISTORICAL_MAX_MEMORY } from '../../constants';
import { fetchAllLambdaConfigurations } from '../../helpers';
import { CheckResult, Rule, Rules } from '../../types';

const hasMemoryUnderMaxMemory = (lambdaConfiguration: FunctionConfiguration) =>
  lambdaConfiguration.MemorySize === undefined ||
  lambdaConfiguration.MemorySize < AWS_HISTORICAL_MAX_MEMORY;
const run = async (
  resourceArns: ARN[],
): Promise<{
  results: CheckResult[];
}> => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);

  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    success: hasMemoryUnderMaxMemory(lambdaConfiguration),
    memorySize: lambdaConfiguration.MemorySize,
  }));

  return { results };
};

export default {
  run,
  rule: Rules.UNDER_MAX_MEMORY,
} as Rule;
