export type Configuration = {
  rules?: Record<string, RuleConfiguration>;
};

export interface BaseConfiguration {
  ignoredResources: string[];
}

// example rule config
export interface UnderMaxMemoryRuleConfig extends BaseConfiguration {
  maxMemory: number;
}

export type RuleConfiguration = BaseConfiguration | UnderMaxMemoryRuleConfig;
