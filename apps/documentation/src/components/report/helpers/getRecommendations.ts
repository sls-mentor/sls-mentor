import { rules, Severity } from '@sls-mentor/core';
import { Recommendation, Results } from '../types';

const severityToMultiplier: Record<Severity, number> = {
  low: 1,
  medium: 3,
  high: 5,
  critical: 10,
};

const getRuleImportanceLevel = (
  failingResources: number,
  easyToFix: boolean,
  severity: Severity,
): number => {
  const multiplier = severityToMultiplier[severity];

  return failingResources * multiplier * (easyToFix ? 1.5 : 1);
};

export const getRecommendations = (results: Results): Recommendation[] => {
  const mappedResults = Object.entries(results).map(
    ([ruleName, { passingResources, totalResources }]) => {
      const failingResources = totalResources - passingResources;
      const rule = rules.find(({ fileName }) => fileName === ruleName);

      if (rule === undefined) {
        throw new Error('Unexpected ruleName encountered');
      }

      const { service, easyToFix, severity } = rule;

      const ruleImportanceLevel = getRuleImportanceLevel(
        failingResources,
        easyToFix,
        severity,
      );

      return {
        ruleName,
        service,
        tags: [severity, ...(easyToFix ? ['quick-fix' as const] : [])],
        importance: ruleImportanceLevel,
      };
    },
  );

  return mappedResults
    .filter(({ importance }) => importance > 0)
    .sort(
      ({ importance: importanceA }, { importance: importanceB }) =>
        importanceB - importanceA,
    )
    .slice(0, 3);
};
