const abbreviateFunction = (fullFuncName, stackName) =>
  fullFuncName.replace(`${stackName}-`, '');

const stackName = 'swarmion-orchestrator-dev';

const hasDefaultMemory = lambdaFunction => {
  // TODO: consider ignoring memorySize === 1024 if it is
  // explicitly defined in serverless.{ts,json,yaml}
  const shortenedName = abbreviateFunction(
    lambdaFunction.FunctionName,
    stackName,
  );

  return lambdaFunction.MemorySize === 1024;
};

const run = lambdaFunctions => {
  try {
    const functionsWithDefaultMemory = lambdaFunctions.filter(hasDefaultMemory);

    const failingResources = functionsWithDefaultMemory.map(lambda => ({
      arn: lambda.FunctionArn,
      memory: lambda.MemorySize,
    }));

    if (functionsWithDefaultMemory.length > 0) {
      return false;
    } else {
      return true;
    }
  } catch (e) {
    console.error(e);
    result = false;
  }

  return result;
};
