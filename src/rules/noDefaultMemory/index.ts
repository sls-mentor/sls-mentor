import { ARN } from '@aws-sdk/util-arn-parser';
import { fetchAllLambdaConfigurations } from '../../helpers';
import { CheckResult, Rule, Rules } from '../../types';

const DEFAULT_MEMORY_SIZE = 1024;

const run = async (
  resourceArns: ARN[],
): Promise<{
  results: CheckResult[];
}> => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);

  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    memory: lambdaConfiguration.MemorySize,
    success: lambdaConfiguration.MemorySize !== DEFAULT_MEMORY_SIZE,
  }));

  return { results };
};

export default {
  run,
  rule: Rules.NO_DEFAULT_MEMORY,
} as Rule;
