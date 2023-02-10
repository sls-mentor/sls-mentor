import * as cdk from 'aws-cdk-lib';
import { Architecture, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { lambdaInlineCode } from '../common/lambdaInlineCode';

export const PASS_ARM64_LAMBDA_NAME = 'PassArm64Lambda';

export const setupLambda = (stack: cdk.Stack): void => {
  new Function(stack, PASS_ARM64_LAMBDA_NAME, {
    architecture: Architecture.ARM_64,
    runtime: Runtime.NODEJS_16_X,
    code: lambdaInlineCode,
    handler: 'index.handler',
  });
};
