export type Configuration = {
  rules?: Record<string, RuleConfiguration>;
};

export interface BaseConfiguration {
  ignoredResources?: string[];
}

// example rule config
export interface UnderMaxMemoryRuleConfig extends BaseConfiguration {
  maxMemory?: number;
}

export type RuleConfiguration = BaseConfiguration | UnderMaxMemoryRuleConfig;

export const baseConfigTypeGuard = (
  config: unknown,
): config is BaseConfiguration => {
  if (!Object.prototype.hasOwnProperty.call(config, 'ignoredResources')) {
    return true;
  }

  const ignoredResources = (config as Record<string, unknown>).ignoredResources;
  if (!Array.isArray(ignoredResources)) {
    return false;
  }

  const isArrayOfString = ignoredResources.reduce<boolean>(
    (areValuesAllString, value) => {
      if (typeof value !== 'string') {
        return false;
      }

      return areValuesAllString;
    },
    true,
  );

  return isArrayOfString;
};
