import {
  FunctionConfiguration,
  ListVersionsByFunctionCommand,
} from '@aws-sdk/client-lambda';
import { ARN, build } from '@aws-sdk/util-arn-parser';
import { lambdaClient } from '../../clients';
import { filterLambdaFromResources } from './filterLambdaFromResources';

const fetchLambdaVersionsByArn = async (
  arn: ARN,
): Promise<FunctionConfiguration[]> => {
  const { Versions: versions } = await lambdaClient.send(
    new ListVersionsByFunctionCommand({ FunctionName: build(arn) }),
  );

  return versions ?? [];
};

export const fetchAllLambdaVersions = async (
  resources: ARN[],
): Promise<{ arn: string; versions: FunctionConfiguration[] }[]> => {
  const lambdaResources = filterLambdaFromResources(resources);

  const lambdaVersions = await Promise.all(
    lambdaResources.map(async arn => ({
      arn: build(arn),
      versions: await fetchLambdaVersionsByArn(arn),
    })),
  );

  return lambdaVersions;
};
