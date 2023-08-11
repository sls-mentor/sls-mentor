import { Category } from '@sls-mentor/core';
import { ChecksResults, ChecksResultsByCategory } from '../types';

export const getResultsByCategory = (
  results: ChecksResults,
): ChecksResultsByCategory => {
  const resultsByCategory: ChecksResultsByCategory = {
    GreenIT: 0,
    ITCosts: 0,
    Security: 0,
    Speed: 0,
    Stability: 0,
  };

  const categoryTotals: ChecksResultsByCategory = {
    GreenIT: 0,
    ITCosts: 0,
    Security: 0,
    Speed: 0,
    Stability: 0,
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

  Object.entries(categoryTotals).forEach(([category, total]) => {
    if (total > 0) {
      resultsByCategory[category as Category] *= total > 0 ? 100 / total : 0;
    } else {
      resultsByCategory[category as Category] = 100;
    }
  });

  return resultsByCategory;
};
