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
exports.fetchTaggedResourceArns = void 0;
const client_resource_groups_tagging_api_1 = require("@aws-sdk/client-resource-groups-tagging-api");
const util_arn_parser_1 = require("@aws-sdk/util-arn-parser");
const fetchTaggedResourceArns = (tags) => __awaiter(void 0, void 0, void 0, function* () {
    var e_1, _a;
    var _b;
    const tagClient = new client_resource_groups_tagging_api_1.ResourceGroupsTaggingAPIClient({});
    const taggedResources = [];
    try {
        for (var _c = __asyncValues((0, client_resource_groups_tagging_api_1.paginateGetResources)({ client: tagClient }, {
            TagFilters: tags.map(({ key, value }) => {
                return { Key: key, Values: [value] };
            }),
        })), _d; _d = yield _c.next(), !_d.done;) {
            const page = _d.value;
            taggedResources.push(...((_b = page.ResourceTagMappingList) !== null && _b !== void 0 ? _b : []));
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_d && !_d.done && (_a = _c.return)) yield _a.call(_c);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return taggedResources.map(resource => (0, util_arn_parser_1.parse)(resource.ResourceARN));
});
exports.fetchTaggedResourceArns = fetchTaggedResourceArns;
