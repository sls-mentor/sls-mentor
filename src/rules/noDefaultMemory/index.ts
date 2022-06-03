import {
  GetFunctionConfigurationCommand,
  LambdaClient,
} from '@aws-sdk/client-lambda';
import { Rule } from '../../types';

const DEFAULT_MEMORY_SIZE = 1024;
const client = new LambdaClient({});

export default {
  ruleName: 'No default memory',
  errorMessage: 'The following functions have their memory set as default.',
  run: async resources => {
    resources = resources.filter(({ arn }) => arn.service === 'lambda');

    const results = await Promise.all(
      resources.map(async ({ arn }) => {
        const lambdaConfig = await client.send(
          new GetFunctionConfigurationCommand({ FunctionName: arn.resource }),
        );

        return {
          arn: lambdaConfig.FunctionArn,
          memory: lambdaConfig.MemorySize,
          success: lambdaConfig.MemorySize !== DEFAULT_MEMORY_SIZE,
        };
      }),
    );

    return { results };
  },
} as Rule;
