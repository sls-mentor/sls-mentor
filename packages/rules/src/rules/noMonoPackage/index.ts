import { fetchAllLambdaConfigurations } from '@sls-mentor/aws-api';

import { Rule, Stage } from 'types';

const hasUniqueShaCode = (
  lambdaConfiguration: Awaited<
    ReturnType<typeof fetchAllLambdaConfigurations>
  >[number]['configuration'],
  functionsArnGroupedByCodeSha: Record<string, string[]>,
): boolean => {
  const codeSha = lambdaConfiguration.CodeSha256 ?? '';

  return codeSha !== ''
    ? functionsArnGroupedByCodeSha[codeSha]?.length === 1
    : true;
};

const run: Rule['run'] = async resourceArns => {
  const lambdasConfigurations =
    await fetchAllLambdaConfigurations(resourceArns);

  const functionsArnGroupedByCodeSha = lambdasConfigurations.reduce(
    (acc, { configuration }) => {
      const key = configuration.CodeSha256;
      const functionArn = configuration.FunctionArn;
      if (key === undefined || functionArn === undefined) {
        return acc;
      }
      if (!Object.keys(acc).includes(key)) {
        acc[key] = [];
      }
      (acc[key] as string[]).push(functionArn);

      return acc;
    },
    {} as Record<string, string[]>,
  );

  const results = lambdasConfigurations.map(({ arn, configuration }) => {
    const shaCode = configuration.CodeSha256 ?? '';
    const uniqueCode = hasUniqueShaCode(
      configuration,
      functionsArnGroupedByCodeSha,
    );
    const identicalCodeFunctions =
      shaCode !== '' && !uniqueCode
        ? functionsArnGroupedByCodeSha[shaCode]
        : '';

    return {
      arn,
      success: uniqueCode,
      identicalCodeFunctionsArn: identicalCodeFunctions,
    };
  });

  return { results };
};

export const noMonoPackage: Rule = {
  ruleName: 'Lambda: No Mono Package',
  errorMessage: 'The function code packaged with others',
  run,
  fileName: 'noMonoPackage',
  categories: ['Stability'],
  level: 1,
  stages: [Stage.prod, Stage.dev],
  service: 'Lambda',
  easyToFix: true,
  severity: 'low',
};
