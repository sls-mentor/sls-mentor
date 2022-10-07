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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCloudFormationResourceArns = void 0;
const client_cloudformation_1 = require("@aws-sdk/client-cloudformation");
const client_sts_1 = require("@aws-sdk/client-sts");
const getSupportedResourceArn_1 = require("./getSupportedResourceArn");
const fetchCloudFormationResourceArns = (cloudformations) => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    var _b, _c;
    const cloudFormationClient = new client_cloudformation_1.CloudFormationClient({});
    const stsClient = new client_sts_1.STSClient({});
    const resources = [];
    for (const cloudformation of cloudformations) {
        try {
            for (var _d = (e_1 = void 0, __asyncValues((0, client_cloudformation_1.paginateListStackResources)({ client: cloudFormationClient }, { StackName: cloudformation }))), _e; _e = yield _d.next(), !_e.done;) {
                const page = _e.value;
                resources.push(...((_b = page.StackResourceSummaries) !== null && _b !== void 0 ? _b : []));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_e && !_e.done && (_a = _d.return)) yield _a.call(_d);
            }
            finally { if (e_1) throw e_1.error; }
        }
    }
    const { Account } = yield stsClient.send(new client_sts_1.GetCallerIdentityCommand({}));
    if (Account === undefined) {
        throw new Error('IAM user or role whose credentials are used to call the operations with the STS Client are undefined.');
    }
    const region = (_c = process.env.AWS_REGION) !== null && _c !== void 0 ? _c : (yield cloudFormationClient.config.region());
    const supportedRessources = Object.keys(getSupportedResourceArn_1.ressourceTypeToRessources);
    return resources.flatMap(({ ResourceType, PhysicalResourceId }) => PhysicalResourceId !== undefined &&
        ResourceType !== undefined &&
        supportedRessources.includes(ResourceType)
        ? (0, getSupportedResourceArn_1.getSupportedResourceArn)({ ResourceType, PhysicalResourceId }, region, Account)
        : []);
});
exports.fetchCloudFormationResourceArns = fetchCloudFormationResourceArns;
