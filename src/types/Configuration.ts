export type Configuration = {
  rules?: Record<string, RuleConfiguration>;
};

export interface BaseConfiguration {
  ignoredResources: string[];
}

export type RuleConfiguration = BaseConfiguration;
