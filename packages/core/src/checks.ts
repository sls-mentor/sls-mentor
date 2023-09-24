import { CustomARN } from '@sls-mentor/arn';
import {
  allRules,
  Rule,
  RuleConfiguration,
  SlsMentorLevel,
} from '@sls-mentor/rules';

import { ChecksResults } from './types';

export type RunChecksHooks = {
  beforeAllRules?: (rules: Rule[]) => void;
  beforeEachRule?: (rule: Rule) => void;
  afterEachRule?: (rule: Rule) => void;
  afterAllRules?: (rules: Rule[]) => void;
};

export const runChecks = async ({
  resourcesToCheck,
  level,
  rulesConfigurations,
  hooks = {},
}: {
  resourcesToCheck: CustomARN[];
  level: SlsMentorLevel;
  rulesConfigurations?: Record<string, RuleConfiguration>;
  hooks?: RunChecksHooks;
}): Promise<ChecksResults> => {
  const rulesToRunAccordingToLevel = allRules.filter(
    rule => rule.level <= level,
  );

  if (hooks.beforeAllRules) {
    hooks.beforeAllRules(rulesToRunAccordingToLevel);
  }

  const results = await Promise.all(
    rulesToRunAccordingToLevel.map(async rule => {
      const ignoredArnPatterns =
        rulesConfigurations?.[rule.fileName]?.ignoredResources;

      const filteredResourcesArns = ignoredArnPatterns
        ? CustomARN.filterIgnoredArns(resourcesToCheck, ignoredArnPatterns)
        : resourcesToCheck;

      if (hooks.beforeEachRule) {
        hooks.beforeEachRule(rule);
      }

      const ruleResult = (
        await rule.run(
          filteredResourcesArns,
          rulesConfigurations?.[rule.fileName],
        )
      ).results;

      if (hooks.afterEachRule) {
        hooks.afterEachRule(rule);
      }

      return { rule, result: ruleResult };
    }),
  );

  if (hooks.afterAllRules) {
    hooks.afterAllRules(rulesToRunAccordingToLevel);
  }

  return results;
};
