import { ARN } from '@aws-sdk/util-arn-parser';
import {
  GetFunctionConfigurationCommand,
  LambdaClient,
} from '@aws-sdk/client-lambda';
import { Rule } from '../..';

const run = async (
  resources: { arn: ARN }[],
): Promise<{
  results: ({ arn: string; success: boolean } & Record<string, unknown>)[];
}> => {
  const client = new LambdaClient({});
  const lambdaNames = resources
    .filter(({ arn }) => arn.service === 'lambda')
    .map(({ arn }) => arn.resource);
  const lambdaConfigurations = await Promise.all(
    lambdaNames.map(FunctionName =>
      client.send(new GetFunctionConfigurationCommand({ FunctionName })),
    ),
  );
  const results = lambdaConfigurations.map(lambdaConfiguration => ({
    arn: lambdaConfiguration.FunctionArn ?? '',
    success:
      lambdaConfiguration.CodeSize !== undefined &&
      lambdaConfiguration.CodeSize < 5000000,
    bundleSize: lambdaConfiguration.CodeSize,
  }));

  return { results };
};

export default {
  ruleName: 'Light Bundle',
  errorMessage:
    'The following functions have bundles that weight more than 5 Mb.\nSee (https://m33.notion.site/Serverless-Sustainability-Audit-a36847289fd64339a60e40bc5aa63092) for impact.',
  run,
} as Rule;
