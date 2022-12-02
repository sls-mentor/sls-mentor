import {
  FunctionConfiguration,
  ListVersionsByFunctionCommand,
} from '@aws-sdk/client-lambda';
import { lambdaClient } from '../../clients';
import { GuardianARN, LambdaFunctionARN } from '../../types';

const fetchLambdaVersionsByArn = async (
  arn: LambdaFunctionARN,
): Promise<FunctionConfiguration[]> => {
  const { Versions: versions } = await lambdaClient.send(
    new ListVersionsByFunctionCommand({ FunctionName: arn.getFunctionName() }),
  );

  return versions ?? [];
};

export const fetchAllLambdaVersions = async (
  resources: GuardianARN[],
): Promise<{ arn: LambdaFunctionARN; versions: FunctionConfiguration[] }[]> => {
  const lambdaResources = GuardianARN.filterArns(resources, LambdaFunctionARN);

  const lambdaVersions = await Promise.all(
    lambdaResources.map(async arn => ({
      arn,
      versions: await fetchLambdaVersionsByArn(arn),
    })),
  );

  return lambdaVersions;
};
