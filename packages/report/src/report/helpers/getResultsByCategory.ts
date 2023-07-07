import { CATEGORIES, Category, RuleResults, rules } from '@sls-mentor/core';

const getRuleCategories = (ruleName: string): Category[] => {
  const matchingRule = rules.find(({ fileName }) => fileName === ruleName);

  if (matchingRule === undefined) {
    throw new Error(`unknown rule name ${ruleName}`);
  }

  return matchingRule.categories;
};

export const getResultsByCategory = (
  results: RuleResults,
): Record<Category, RuleResults[string]> =>
  Object.fromEntries(
    CATEGORIES.map(category => [
      category,
      Object.entries(results)
        .filter(([ruleName]) => getRuleCategories(ruleName).includes(category))
        .reduce<RuleResults[string]>(
          (prev, [, { passingResources, totalResources }]) => ({
            passingResources: prev.passingResources + passingResources,
            totalResources: prev.totalResources + totalResources,
          }),
          { passingResources: 0, totalResources: 0 },
        ),
    ]),
  ) as Record<Category, RuleResults[string]>;
