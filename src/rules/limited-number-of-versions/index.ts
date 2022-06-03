import {
  FunctionConfiguration,
  LambdaClient,
  ListVersionsByFunctionCommand,
} from '@aws-sdk/client-lambda';
import { build } from '@aws-sdk/util-arn-parser';
import { Resource, Rule } from '../../types';

interface CheckOutput {
  results: ({ arn: string; success: boolean } & Record<string, unknown>)[];
}

const MAX_NUMBER_OF_VERSIONS = 3 + 1; // +$latest

const filterLambdaFromResources = (resources: Resource[]): Resource[] =>
  resources.filter(({ arn }) => arn.service === 'lambda');

const fetchLambdaVersions = async (
  lambdaName: string,
  client: LambdaClient,
): Promise<FunctionConfiguration[]> => {
  const { Versions: lambdaVersions } = await client.send(
    new ListVersionsByFunctionCommand({ FunctionName: lambdaName }),
  );

  return lambdaVersions ?? [];
};

const run = async (resources: Resource[]): Promise<CheckOutput> => {
  const client = new LambdaClient({});
  const lambdaResources = filterLambdaFromResources(resources);

  const lambdaVersions = await Promise.all(
    lambdaResources.map(async ({ arn }) => ({
      arn: build(arn),
      versions: await fetchLambdaVersions(arn.resource, client),
    })),
  );

  const results = lambdaVersions.map(({ arn, versions }) => ({
    arn,
    success: versions.length <= MAX_NUMBER_OF_VERSIONS,
    versionNumber: Math.max(versions.length - 1, 0),
  }));

  return { results };
};

export default {
  ruleName: 'Limited Number of Lambda Versions',
  errorMessage:
    'The following functions have a number of deployed versions greater than 3',
  run,
} as Rule;
