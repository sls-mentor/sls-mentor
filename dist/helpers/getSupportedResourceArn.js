"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSupportedResourceArn = exports.ressourceTypeToRessources = void 0;
const getS3ResourceArn = (region, accountId, resource) => {
    return {
        partition: 'aws',
        service: 's3',
        region,
        accountId,
        resource,
    };
};
const getLambdaResourceArn = (region, accountId, resource) => {
    return {
        partition: 'aws',
        service: 'lambda',
        region,
        accountId,
        resource: `function:${resource}`,
    };
};
const getSQSResourceArn = (region, accountId, resource) => {
    return {
        partition: 'aws',
        service: 'sqs',
        region,
        accountId,
        resource,
    };
};
exports.ressourceTypeToRessources = {
    'AWS::Lambda::Function': getLambdaResourceArn,
    'AWS::S3::Bucket': getS3ResourceArn,
    'AWS::SQS::Queue': getSQSResourceArn,
};
const getSupportedResourceArn = ({ ResourceType, PhysicalResourceId, }, region, account) => {
    const resourceARN = [];
    const getRessources = exports.ressourceTypeToRessources[ResourceType];
    resourceARN.push(getRessources(region, account, PhysicalResourceId));
    return resourceARN;
};
exports.getSupportedResourceArn = getSupportedResourceArn;
