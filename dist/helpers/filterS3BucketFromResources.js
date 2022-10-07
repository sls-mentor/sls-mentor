"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterS3BucketFromResources = void 0;
const filterS3BucketFromResources = (resources) => resources.filter(arn => arn.service === 's3');
exports.filterS3BucketFromResources = filterS3BucketFromResources;
