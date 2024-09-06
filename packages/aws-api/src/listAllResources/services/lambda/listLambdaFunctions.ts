import {
  FunctionConfiguration,
  paginateListFunctions,
} from '@aws-sdk/client-lambda';

import { LambdaFunctionARN } from '@sls-mentor/arn';

import { lambdaClient } from 'clients';

export const listLambdaFunctions = async (): Promise<LambdaFunctionARN[]> => {
  const lambdaFunctions: FunctionConfiguration[] = [];

  try {
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
  } catch (e) {
    console.log('There was an issue while getting LambdaFunctions: ', {
      e,
    });

    return [];
  }
};
