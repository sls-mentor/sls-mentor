import { Category, RuleName, Service, SlsMentorLevel } from '@sls-mentor/rules';

export type PassingResources = {
  passingResourcesAmount: number;
  totalResourcesAmount: number;
  passingResources: { arn: string; ruleName: RuleName }[];
  totalResources: { arn: string; ruleName: RuleName }[];
};

export type PassingRules = {
  passingRulesAmount: number;
  totalRulesAmount: number;
  passingRules: RuleName[];
  totalRules: RuleName[];
};

export type PassingResourcesByRule = Partial<
  Record<RuleName, PassingResources>
>;
export type PassingResourcesByService = Partial<
  Record<Service, PassingResources>
>;
export type PassingResourcesByCategory = Partial<
  Record<Category, PassingResources>
>;
export type PassingResourcesByLevel = Partial<
  Record<SlsMentorLevel, PassingResources>
>;

export type PassingRulesByResource = Partial<Record<string, PassingRules>>;
export type PassingRulesByService = Partial<Record<Service, PassingRules>>;
export type PassingRulesByCategory = Partial<Record<Category, PassingRules>>;
export type PassingRulesByLevel = Partial<Record<SlsMentorLevel, PassingRules>>;
