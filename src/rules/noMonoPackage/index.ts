import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { baseConfigTypeGuard } from '../../configuration/utils/baseConfigTypeGuard';
import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { BaseConfiguration, Category, Rule } from '../../types';

type Configuration = BaseConfiguration;
type NoMonoPackageRule = Rule<Configuration>;

const hasUniqueShaCode = (
  lambdaConfiguration: FunctionConfiguration,
  functionsArnGroupedByCodeSha: Record<string, string[]>,
): boolean => {
  const codeSha = lambdaConfiguration.CodeSha256 ?? '';

  return codeSha !== ''
    ? functionsArnGroupedByCodeSha[codeSha].length === 1
    : true;
};

const run: NoMonoPackageRule['run'] = async resourceArns => {
  const lambdasConfigurations = await fetchAllLambdaConfigurations(
    resourceArns,
  );

  const functionsArnGroupedByCodeSha = lambdasConfigurations.reduce(
    (acc, config) => {
      const key = config.CodeSha256;
      const functionArn = config.FunctionArn;
      if (key === undefined || functionArn === undefined) {
        return acc;
      }
      if (!Object.keys(acc).includes(key)) {
        acc[key] = [];
      }
      acc[key].push(functionArn);

      return acc;
    },
    {} as Record<string, string[]>,
  );

  const results = lambdasConfigurations.map(lambdaConfiguration => {
    const shaCode = lambdaConfiguration.CodeSha256 ?? '';
    const uniqueCode = hasUniqueShaCode(
      lambdaConfiguration,
      functionsArnGroupedByCodeSha,
    );
    const identicalCodeFunctions =
      shaCode !== '' && !uniqueCode
        ? functionsArnGroupedByCodeSha[shaCode]
        : '';

    return {
      arn: lambdaConfiguration.FunctionArn ?? '',
      success: uniqueCode,
      identicalCodeFunctionsArn: identicalCodeFunctions,
    };
  });

  return { results };
};

const rule: NoMonoPackageRule = {
  name: 'NO_MONO_PACKAGE',
  displayName: 'Lambda: No Mono Package',
  errorMessage:
    "The function's code is not packaged separately from the others'",
  run,
  fileName: 'noMonoPackage',
  categories: [Category.SECURITY, Category.STABILITY],
  configurationTypeGuards: baseConfigTypeGuard,
};

export default rule;
