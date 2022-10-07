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
exports.fetchAllLambdaConfigurations = void 0;
const client_lambda_1 = require("@aws-sdk/client-lambda");
const util_arn_parser_1 = require("@aws-sdk/util-arn-parser");
const clients_1 = require("../clients");
const filterLambdaFromResources_1 = require("./filterLambdaFromResources");
const fetchLambdaConfigurationByArn = (arn) => __awaiter(void 0, void 0, void 0, function* () {
    return yield clients_1.lambdaClient.send(new client_lambda_1.GetFunctionConfigurationCommand({ FunctionName: (0, util_arn_parser_1.build)(arn) }));
});
const fetchAllLambdaConfigurations = (resources) => __awaiter(void 0, void 0, void 0, function* () {
    const lambdas = (0, filterLambdaFromResources_1.filterLambdaFromResources)(resources);
    const lambdaConfigurations = yield Promise.all(lambdas.map(arn => fetchLambdaConfigurationByArn(arn)));
    return lambdaConfigurations;
});
exports.fetchAllLambdaConfigurations = fetchAllLambdaConfigurations;
