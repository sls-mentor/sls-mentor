import { fetchAllLambdaConfigurations } from '../../helpers';
import { Rule, Rules } from '../../types';

const DEFAULT_MEMORY_SIZE = 1024;

const run: Rule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);

  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    memory: lambdaConfiguration.MemorySize,
    success: lambdaConfiguration.MemorySize !== DEFAULT_MEMORY_SIZE,
  }));

  return { results };
};

const rule: Rule = {
  run,
  rule: Rules.NO_DEFAULT_MEMORY,
};

export default rule;
