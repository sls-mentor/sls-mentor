import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { baseConfigTypeGuard } from '../../configuration/utils/baseConfigTypeGuard';
import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { BaseConfiguration, Category, Rule } from '../../types';

const AWS_MAXIMUM_TIMEOUT = 900;

type Configuration = BaseConfiguration;
type NoMaxTimeoutRule = Rule<Configuration>;

const hasMaximumTimeout = (lambdaConfiguration: FunctionConfiguration) =>
  lambdaConfiguration.Timeout !== undefined &&
  lambdaConfiguration.Timeout === AWS_MAXIMUM_TIMEOUT;

const run: NoMaxTimeoutRule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);

  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    success: !hasMaximumTimeout(lambdaConfiguration),
    timeout: lambdaConfiguration.Timeout,
  }));

  return { results };
};

const rule: NoMaxTimeoutRule = {
  name: 'NO_MAX_TIMEOUT',
  displayName: 'Lambda: No Maximum Timeout',
  errorMessage: 'The following functions have their timeout set as the maximum',
  run,
  fileName: 'noMaxTimeout',
  categories: [Category.GREEN_IT, Category.IT_COSTS, Category.STABILITY],
  configurationTypeGuards: baseConfigTypeGuard,
};

export default rule;
