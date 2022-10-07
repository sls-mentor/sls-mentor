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
const hasUniqueShaCode = (lambdaConfiguration, functionsArnGroupedByCodeSha) => {
    var _a;
    const codeSha = (_a = lambdaConfiguration.CodeSha256) !== null && _a !== void 0 ? _a : '';
    return codeSha !== ''
        ? functionsArnGroupedByCodeSha[codeSha].length === 1
        : true;
};
const run = (resourceArns) => __awaiter(void 0, void 0, void 0, function* () {
    const lambdasConfigurations = yield (0, helpers_1.fetchAllLambdaConfigurations)(resourceArns);
    const functionsArnGroupedByCodeSha = lambdasConfigurations.reduce((acc, config) => {
        const key = config.CodeSha256;
        const functionArn = config.FunctionArn;
        if (key === undefined || functionArn === undefined) {
            return acc;
        }
        if (!Object.keys(acc).includes(key)) {
            acc[key] = [];
        }
        acc[key].push(functionArn);
        return acc;
    }, {});
    const results = lambdasConfigurations.map(lambdaConfiguration => {
        var _a, _b;
        const shaCode = (_a = lambdaConfiguration.CodeSha256) !== null && _a !== void 0 ? _a : '';
        const uniqueCode = hasUniqueShaCode(lambdaConfiguration, functionsArnGroupedByCodeSha);
        const identicalCodeFunctions = shaCode !== '' && !uniqueCode
            ? functionsArnGroupedByCodeSha[shaCode]
            : '';
        return {
            arn: (_b = lambdaConfiguration.FunctionArn) !== null && _b !== void 0 ? _b : '',
            success: uniqueCode,
            identicalCodeFunctionsArn: identicalCodeFunctions,
        };
    });
    return { results };
});
const rule = {
    ruleName: 'Lambda: No Identical Code',
    errorMessage: "The function's code is identical to other functions",
    run,
    fileName: 'noIdenticalCode',
    categories: [types_1.Category.SECURITY, types_1.Category.STABILITY],
};
exports.default = rule;
