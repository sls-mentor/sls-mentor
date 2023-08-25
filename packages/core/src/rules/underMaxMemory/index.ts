import { FunctionConfiguration } from '@aws-sdk/client-lambda';
import { fetchAllLambdaConfigurations } from '../../aws-sdk-helpers';
import { baseConfigTypeGuard } from '../../configuration/utils/baseConfigTypeGuard';
import { AWS_HISTORICAL_MAX_MEMORY } from '../../constants';
import { Stage } from '../../constants/stage';
import { Rule, UnderMaxMemoryRuleConfig } from '../../types';

const hasMemoryUnderMaxMemory = (lambdaConfiguration: FunctionConfiguration) =>
  lambdaConfiguration.MemorySize === undefined ||
  lambdaConfiguration.MemorySize < AWS_HISTORICAL_MAX_MEMORY;

const run: Rule['run'] = async resourceArns => {
  const lambdaConfigurations = await fetchAllLambdaConfigurations(resourceArns);

  const results = lambdaConfigurations.map(({ arn, configuration }) => ({
    arn,
    success: hasMemoryUnderMaxMemory(configuration),
    memorySize: configuration.MemorySize,
  }));

  return { results };
};

const ruleConfigTypeguard = (
  config: unknown,
): config is UnderMaxMemoryRuleConfig => {
  const isBaseConfigMatch = baseConfigTypeGuard(config);
  if (!isBaseConfigMatch) {
    return false;
  }

  // @ts-expect-error -- max memory doesn't exists on base config but could on under max rule
  const maxMemory = config.maxMemory as unknown | undefined;
  if (maxMemory === undefined) {
    return true;
  }
  if (typeof maxMemory === 'number') {
    return true;
  }

  return false;
};

export const underMaxMemory: Rule<UnderMaxMemoryRuleConfig> = {
  ruleName: 'Lambda: Under Maximum Memory',
  errorMessage: `The function's memory is set to the historical maximum limit of ${AWS_HISTORICAL_MAX_MEMORY} MB or higher`,
  run,
  fileName: 'underMaxMemory',
  categories: ['GreenIT', 'ITCosts'],
  level: 2,
  service: 'Lambda',
  configurationTypeguard: ruleConfigTypeguard,
  easyToFix: true,
  severity: 'medium',
  stage: [Stage.dev, Stage.prod],
};
