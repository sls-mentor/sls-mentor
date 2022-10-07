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
const MAX_AMOUNT_OF_VERSIONS = 3 + 1; // +$latest
const run = (resourceArns) => __awaiter(void 0, void 0, void 0, function* () {
    const lambdaVersions = yield (0, helpers_1.fetchAllLambdaVersions)(resourceArns);
    const results = lambdaVersions.map(({ arn, versions }) => ({
        arn,
        success: versions.length <= MAX_AMOUNT_OF_VERSIONS,
        versionAmount: versions.length,
    }));
    return { results };
});
const rule = {
    ruleName: 'Lambda: Limited Amount of Versions',
    errorMessage: 'The following functions have an amount of deployed versions greater than 3',
    run,
    fileName: 'limitedAmountOfVersions',
    categories: [types_1.Category.GREEN_IT, types_1.Category.STABILITY],
};
exports.default = rule;
