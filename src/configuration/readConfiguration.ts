const DEFAULT_CONFIG_PATH_FILE = './guardian.json';
import * as fs from 'fs';
import { Configuration, Rule, RuleConfiguration, TypeGuard } from '../types';

export const readConfigurationFile = (
  rules: Rule<RuleConfiguration>[],
): Configuration => {
  const rawConfig = fs.readFileSync(DEFAULT_CONFIG_PATH_FILE).toString();
  const configuration = JSON.parse(rawConfig) as Record<string, unknown>;

  if (!Object.prototype.hasOwnProperty.call(configuration, 'rules')) {
    return {};
  }

  if (typeof configuration.rules !== 'object') {
    throw new Error("Configuration 'rules' should be an object");
  }

  const wantedRulesConfigurations = configuration.rules as Record<
    string,
    unknown
  >;

  const typedRules: Record<string, RuleConfiguration> = {};
  const ruleNames = rules.map(rule => rule.name);
  const rulesConfigTypeGuards = rules.reduce<
    Record<string, TypeGuard<RuleConfiguration>>
  >((typeGuards, rule) => {
    typeGuards[rule.name] = rule.configurationTypeGuards;

    return typeGuards;
  }, {});

  Object.keys(wantedRulesConfigurations).forEach(ruleName => {
    if (ruleNames.indexOf(ruleName) === -1) {
      return;
    }
    const ruleTypeGuard = rulesConfigTypeGuards[ruleName];
    const config = wantedRulesConfigurations[ruleName];
    if (!ruleTypeGuard(config)) {
      return;
    }
    typedRules[ruleName] = config;
  });

  return {
    rules: typedRules,
  };
};
