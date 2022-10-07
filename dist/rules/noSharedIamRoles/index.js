"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../../helpers");
const types_1 = require("../../types");
const isLambdaRoleShared = (lambdaConfiguration, sharedRoles) => sharedRoles.includes(lambdaConfiguration.Role);
const run = (resourceArns) => __awaiter(void 0, void 0, void 0, function* () {
    const lambdaConfigurations = yield (0, helpers_1.fetchAllLambdaConfigurations)(resourceArns);
    const roles = lambdaConfigurations.map(lambdaConfiguration => lambdaConfiguration.Role);
    const sharedRoles = roles.filter(role => roles.filter(r => r === role).length > 1);
    const results = lambdaConfigurations.map(lambdaConfiguration => {
        var _a;
        return ({
            arn: (_a = lambdaConfiguration.FunctionArn) !== null && _a !== void 0 ? _a : '',
            success: !isLambdaRoleShared(lambdaConfiguration, sharedRoles),
            role: lambdaConfiguration.Role,
        });
    });
    return { results };
});
const rule = {
    ruleName: 'Lambda: No Shared IAM Roles',
    errorMessage: 'The following functions have roles used by 1 or more other functions',
    run,
    fileName: 'noSharedIamRoles',
    categories: [types_1.Category.SECURITY, types_1.Category.STABILITY],
};
exports.default = rule;
