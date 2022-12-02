import {
  FunctionConfiguration,
  paginateListFunctions,
} from '@aws-sdk/client-lambda';
import { lambdaClient } from '../../../clients';
import { LambdaFunctionARN } from '../../../types';

export const listLambdaFunctions = async (): Promise<LambdaFunctionARN[]> => {
  const lambdaFunctions: FunctionConfiguration[] = [];

  for await (const resources of paginateListFunctions(
    { client: lambdaClient },
    {},
  )) {
    lambdaFunctions.push(...(resources.Functions ?? []));
  }

  return lambdaFunctions
    .map(({ FunctionName }) => FunctionName)
    .filter(
      (functionName): functionName is string => functionName !== undefined,
    )
    .map(functionName => LambdaFunctionARN.fromFunctionName(functionName));
};
