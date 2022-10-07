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
exports.fetchAllQueuesAttributes = exports.fetchQueueAttributesByArn = void 0;
const client_sqs_1 = require("@aws-sdk/client-sqs");
const filterSQSFromResources_1 = require("./filterSQSFromResources");
const fetchQueueAttributesByArn = (arn, client) => __awaiter(void 0, void 0, void 0, function* () {
    return {
        arn: arn,
        attributes: yield client.send(new client_sqs_1.GetQueueAttributesCommand({
            QueueUrl: arn.resource,
            AttributeNames: ['RedrivePolicy'],
        })),
    };
});
exports.fetchQueueAttributesByArn = fetchQueueAttributesByArn;
const fetchAllQueuesAttributes = (resourceArns) => __awaiter(void 0, void 0, void 0, function* () {
    const sqsClient = new client_sqs_1.SQSClient({});
    const queues = (0, filterSQSFromResources_1.filterSQSFromResources)(resourceArns);
    const AttributesByArn = yield Promise.all(queues.map(arn => (0, exports.fetchQueueAttributesByArn)(arn, sqsClient)));
    return AttributesByArn;
});
exports.fetchAllQueuesAttributes = fetchAllQueuesAttributes;
