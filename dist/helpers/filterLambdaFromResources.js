"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterLambdaFromResources = void 0;
const filterLambdaFromResources = (resources) => resources.filter(arn => arn.service === 'lambda');
exports.filterLambdaFromResources = filterLambdaFromResources;
