"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResultsByResource = void 0;
const omit_1 = __importDefault(require("lodash/omit"));
const uniq_1 = __importDefault(require("lodash/uniq"));
const getResourcesArnsCheckedByGuardian = (results) => (0, uniq_1.default)(results.flatMap(({ result }) => result.map(({ arn }) => arn)));
const getExtrasFromRuleResult = (result) => (0, omit_1.default)(result, 'arn', 'success');
const getRulesFailedByResource = (resourceArn, results) => results.flatMap(({ rule, result }) => {
    const resultMatchingWithResource = result.find(({ arn }) => arn === resourceArn);
    if (!resultMatchingWithResource || resultMatchingWithResource.success)
        return [];
    const extras = getExtrasFromRuleResult(resultMatchingWithResource);
    return [
        {
            rule,
            extras,
        },
    ];
});
const getResultsByResource = (results) => {
    const checkedResourcesArns = getResourcesArnsCheckedByGuardian(results);
    const resultsByResource = checkedResourcesArns.map(resourceArn => {
        const failedRules = getRulesFailedByResource(resourceArn, results);
        return {
            failedRules,
            resourceArn,
        };
    });
    return resultsByResource.filter(({ failedRules }) => failedRules.length > 0);
};
exports.getResultsByResource = getResultsByResource;
