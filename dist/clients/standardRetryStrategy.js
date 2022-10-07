"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.standardRetryStrategy = exports.MAXIMUM_ATTEMPTS = void 0;
const middleware_retry_1 = require("@aws-sdk/middleware-retry");
exports.MAXIMUM_ATTEMPTS = 10;
const DELAY_INCREMENT = 1000;
exports.standardRetryStrategy = new middleware_retry_1.StandardRetryStrategy(() => Promise.resolve(exports.MAXIMUM_ATTEMPTS), {
    delayDecider: (_delayBase, attempts) => {
        return DELAY_INCREMENT * attempts;
    },
});
exports.standardRetryStrategy.mode = 'STANDARD';
