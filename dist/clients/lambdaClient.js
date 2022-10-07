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
const client_lambda_1 = require("@aws-sdk/client-lambda");
const object_hash_1 = __importDefault(require("object-hash"));
const standardRetryStrategy_1 = require("./standardRetryStrategy");
const cache = {};
const plugin = {
    applyToStack: stack => {
        stack.add(next => (args) => __awaiter(void 0, void 0, void 0, function* () {
            const inputHash = (0, object_hash_1.default)(args);
            if (inputHash in cache) {
                return cache[inputHash];
            }
            const result = next(args);
            Object.assign(cache, { [(0, object_hash_1.default)(args)]: result });
            return yield result;
        }), { step: 'initialize' });
    },
};
const client = new client_lambda_1.LambdaClient({
    maxAttempts: standardRetryStrategy_1.MAXIMUM_ATTEMPTS,
    retryStrategy: standardRetryStrategy_1.standardRetryStrategy,
});
// @ts-ignore : Prevent error ts(2345) - No way to discriminate output type among all possible Lambda Service output types
client.middlewareStack.use(plugin);
exports.default = client;
