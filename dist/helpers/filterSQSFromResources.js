"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterSQSFromResources = void 0;
const filterSQSFromResources = (resourceArns) => resourceArns.filter(({ service }) => service === 'sqs');
exports.filterSQSFromResources = filterSQSFromResources;
