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
exports.fetchAllS3BucketIntelligentTieringConfigurations = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const fetchS3BucketConfigurationByArn = (arn, client) => __awaiter(void 0, void 0, void 0, function* () {
    const { IntelligentTieringConfigurationList: configurationList } = yield client.send(new client_s3_1.ListBucketIntelligentTieringConfigurationsCommand({
        Bucket: arn.resource,
    }));
    return configurationList;
});
const fetchAllS3BucketIntelligentTieringConfigurations = (buckets) => __awaiter(void 0, void 0, void 0, function* () {
    const client = new client_s3_1.S3Client({});
    return Promise.all(buckets.map((arn) => __awaiter(void 0, void 0, void 0, function* () {
        return ({
            arn,
            configuration: yield fetchS3BucketConfigurationByArn(arn, client),
        });
    })));
});
exports.fetchAllS3BucketIntelligentTieringConfigurations = fetchAllS3BucketIntelligentTieringConfigurations;
