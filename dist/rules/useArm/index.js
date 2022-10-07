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
const ARM_ARCHITECTURE = 'arm64';
const isArmArchitecture = (lambdaConfigurations) => lambdaConfigurations.Architectures
    ? lambdaConfigurations.Architectures[0] === ARM_ARCHITECTURE
    : false;
const run = (resourceArns) => __awaiter(void 0, void 0, void 0, function* () {
    const lambdaConfigurations = yield (0, helpers_1.fetchAllLambdaConfigurations)(resourceArns);
    const results = lambdaConfigurations.map(lambdaConfiguration => {
        var _a;
        return ({
            arn: (_a = lambdaConfiguration.FunctionArn) !== null && _a !== void 0 ? _a : '',
            success: isArmArchitecture(lambdaConfiguration),
        });
    });
    return { results };
});
const rule = {
    ruleName: 'Lambda: Use an ARM Architecture',
    errorMessage: "The function's architecture is not set as ARM",
    run,
    fileName: 'useArm',
    categories: [types_1.Category.GREEN_IT, types_1.Category.IT_COSTS, types_1.Category.SPEED],
};
exports.default = rule;
