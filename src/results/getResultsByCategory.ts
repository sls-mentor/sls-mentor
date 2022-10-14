import { Category, ChecksResults, ChecksResultsByCategory } from '../types';

export const getResultsByCategory = (
  results: ChecksResults,
): ChecksResultsByCategory => {
  const resultsByCategory: ChecksResultsByCategory = {
    [Category.GREEN_IT]: 0,
    [Category.IT_COSTS]: 0,
    [Category.SECURITY]: 0,
    [Category.SPEED]: 0,
    [Category.STABILITY]: 0,
  };

  const categoryTotals: ChecksResultsByCategory = {
    [Category.GREEN_IT]: 0,
    [Category.IT_COSTS]: 0,
    [Category.SECURITY]: 0,
    [Category.SPEED]: 0,
    [Category.STABILITY]: 0,
  };

  results.forEach(({ rule, result }) => {
    const categories = rule.categories;
    const ruleRatio =
      result.length > 0
        ? result.filter(({ success }) => success).length / result.length
        : 0;
    categories.forEach(
      category => (categoryTotals[category] += result.length > 0 ? 1 : 0),
    );
    categories.forEach(category => (resultsByCategory[category] += ruleRatio));
  });

  Object.entries(categoryTotals).forEach(
    ([category, total]) =>
      (resultsByCategory[category as Category] *= total > 0 ? 100 / total : 0),
  );

  return resultsByCategory;
};
