"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResultsByCategory = void 0;
const types_1 = require("../types");
const getResultsByCategory = (results) => {
    const resultsByCategory = {
        [types_1.Category.GREEN_IT]: 0,
        [types_1.Category.IT_COSTS]: 0,
        [types_1.Category.SECURITY]: 0,
        [types_1.Category.SPEED]: 0,
        [types_1.Category.STABILITY]: 0,
    };
    const categoryTotals = {
        [types_1.Category.GREEN_IT]: 0,
        [types_1.Category.IT_COSTS]: 0,
        [types_1.Category.SECURITY]: 0,
        [types_1.Category.SPEED]: 0,
        [types_1.Category.STABILITY]: 0,
    };
    results.forEach(({ rule, result }) => {
        const categories = rule.categories;
        const ruleRatio = result.length > 0
            ? result.filter(({ success }) => success).length / result.length
            : 0;
        categories.forEach(category => (categoryTotals[category] += result.length > 0 ? 1 : 0));
        categories.forEach(category => (resultsByCategory[category] += ruleRatio));
    });
    Object.entries(categoryTotals).forEach(([category, total]) => (resultsByCategory[category] *= total > 0 ? 100 / total : 0));
    return resultsByCategory;
};
exports.getResultsByCategory = getResultsByCategory;
