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
const constants_1 = require("../../constants");
const helpers_1 = require("../../helpers");
const types_1 = require("../../types");
const hasMemoryUnderMaxMemory = (lambdaConfiguration) => lambdaConfiguration.MemorySize === undefined ||
    lambdaConfiguration.MemorySize < constants_1.AWS_HISTORICAL_MAX_MEMORY;
const run = (resourceArns) => __awaiter(void 0, void 0, void 0, function* () {
    const lambdaConfigurations = yield (0, helpers_1.fetchAllLambdaConfigurations)(resourceArns);
    const results = lambdaConfigurations.map(lambdaConfiguration => {
        var _a;
        return ({
            arn: (_a = lambdaConfiguration.FunctionArn) !== null && _a !== void 0 ? _a : '',
            success: hasMemoryUnderMaxMemory(lambdaConfiguration),
            memorySize: lambdaConfiguration.MemorySize,
        });
    });
    return { results };
});
const rule = {
    ruleName: 'Lambda: Under Maximum Memory',
    errorMessage: `The function's memory is set to the historical maximum limit of ${constants_1.AWS_HISTORICAL_MAX_MEMORY} MB or higher`,
    run,
    fileName: 'underMaxMemory',
    categories: [types_1.Category.GREEN_IT, types_1.Category.IT_COSTS],
};
exports.default = rule;
