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
const util_arn_parser_1 = require("@aws-sdk/util-arn-parser");
const helpers_1 = require("../../helpers");
const types_1 = require("../../types");
const run = (resourceArns) => __awaiter(void 0, void 0, void 0, function* () {
    const asyncLambdasArns = yield (0, helpers_1.fetchAllAsyncLambdasArns)(resourceArns);
    const invokeConfigs = yield (0, helpers_1.fetchAllLambdaInvokeEventConfigs)(asyncLambdasArns.map(util_arn_parser_1.parse));
    const results = invokeConfigs.map(({ arn, config }) => {
        var _a, _b;
        return ({
            arn,
            success: ((_b = (_a = config === null || config === void 0 ? void 0 : config.DestinationConfig) === null || _a === void 0 ? void 0 : _a.OnFailure) === null || _b === void 0 ? void 0 : _b.Destination) !== undefined,
        });
    });
    return { results };
});
const rule = {
    ruleName: 'Lambda: Specify Failure Destination for Async Functions',
    errorMessage: 'The function is asynchronous but has no failure destination set',
    run,
    fileName: 'asyncSpecifyFailureDestination',
    categories: [types_1.Category.STABILITY],
};
exports.default = rule;
