import {
  FunctionConfiguration,
  LambdaClient,
  ListVersionsByFunctionCommand,
} from '@aws-sdk/client-lambda';
import { ARN, build } from '@aws-sdk/util-arn-parser';
import { Resource } from '../types';
import { filterLambdaFromResources } from './filterLambdaFromResources';

const fetchLambdaVersionsByArn = async (
  arn: ARN,
  client: LambdaClient,
): Promise<FunctionConfiguration[]> => {
  const { Versions: versions } = await client.send(
    new ListVersionsByFunctionCommand({ FunctionName: arn.resource }),
  );

  return versions ?? [];
};

export const fetchAllLambdaVersions = async (
  resources: Resource[],
): Promise<{ arn: string; versions: FunctionConfiguration[] }[]> => {
  const client = new LambdaClient({});
  const lambdaResources = filterLambdaFromResources(resources);

  const lambdaVersions = await Promise.all(
    lambdaResources.map(async ({ arn }) => ({
      arn: build(arn),
      versions: await fetchLambdaVersionsByArn(arn, client),
    })),
  );

  return lambdaVersions;
};
