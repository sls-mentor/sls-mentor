"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MEDIUM_SCORE_THRESHOLD = exports.LOW_SCORE_THRESHOLD = exports.CategoryNames = exports.Category = void 0;
var Category;
(function (Category) {
    Category["GREEN_IT"] = "GREEN_IT";
    Category["STABILITY"] = "STABILITY";
    Category["SPEED"] = "SPEED";
    Category["IT_COSTS"] = "IT_COSTS";
    Category["SECURITY"] = "SECURITY";
})(Category = exports.Category || (exports.Category = {}));
exports.CategoryNames = {
    [Category.GREEN_IT]: 'Green IT',
    [Category.STABILITY]: 'Stability',
    [Category.SPEED]: 'Speed',
    [Category.IT_COSTS]: 'IT costs',
    [Category.SECURITY]: 'Security',
};
exports.LOW_SCORE_THRESHOLD = 50;
exports.MEDIUM_SCORE_THRESHOLD = 75;
