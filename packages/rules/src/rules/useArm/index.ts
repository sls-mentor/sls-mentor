import { fetchAllLambdaConfigurations } from '@sls-mentor/aws-api';

import { Rule, Stage } from 'types';

const ARM_ARCHITECTURE = 'arm64';

const isArmArchitecture = (
  lambdaConfigurations: Awaited<
    ReturnType<typeof fetchAllLambdaConfigurations>
  >[number]['configuration'],
): boolean =>
  lambdaConfigurations.Architectures
    ? lambdaConfigurations.Architectures[0] === ARM_ARCHITECTURE
    : false;

const run: Rule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);
  const results = lambdaConfigurations.map(({ arn, configuration }) => ({
    arn,
    success: isArmArchitecture(configuration),
  }));

  return { results };
};

export const useArm: Rule = {
  ruleName: 'Lambda: Use an ARM Architecture',
  errorMessage: "The function's architecture is not set as ARM",
  run,
  fileName: 'useArm',
  categories: ['GreenIT', 'ITCosts', 'Speed'],
  level: 1,
  stages: [Stage.prod, Stage.dev],
  service: 'Lambda',
  easyToFix: true,
  severity: 'critical',
};
