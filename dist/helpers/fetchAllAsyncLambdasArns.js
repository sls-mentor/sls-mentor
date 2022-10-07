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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllAsyncLambdasArns = void 0;
const util_arn_parser_1 = require("@aws-sdk/util-arn-parser");
const compact_1 = __importDefault(require("lodash/compact"));
const fetchAllLambdaPolicies_1 = require("./fetchAllLambdaPolicies");
const ASYNC_AWS_SERVICES = ['events', 's3', 'sqs', 'sns'];
const isLambdaPolicyAsync = (policy) => {
    var _a;
    const sourceArns = (0, compact_1.default)((_a = policy.Statement) === null || _a === void 0 ? void 0 : _a.map(statement => { var _a, _b; return (_b = (_a = statement.Condition) === null || _a === void 0 ? void 0 : _a.ArnLike) === null || _b === void 0 ? void 0 : _b['AWS:SourceArn']; }));
    return sourceArns.some(sourceArn => ASYNC_AWS_SERVICES.includes((0, util_arn_parser_1.parse)(sourceArn).service));
};
const fetchAllAsyncLambdasArns = (resources) => __awaiter(void 0, void 0, void 0, function* () {
    const lambdaPolicies = yield (0, fetchAllLambdaPolicies_1.fetchAllLambdaPolicies)(resources);
    return (0, compact_1.default)(lambdaPolicies
        .filter(({ policy }) => policy && isLambdaPolicyAsync(policy))
        .map(({ arn }) => arn));
});
exports.fetchAllAsyncLambdasArns = fetchAllAsyncLambdasArns;
