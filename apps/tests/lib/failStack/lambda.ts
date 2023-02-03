import * as cdk from 'aws-cdk-lib';
import { Architecture, Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import path from 'path';

export const FAIL_ARM64_LAMBDA_NAME = 'FailArm64Lambda';
export const FAIL_ARM64_LAMBDA_NAME_BIS = 'FailArm64LambdaBis';

export const setupLambda = (stack: cdk.Stack): void => {
  new NodejsFunction(stack, FAIL_ARM64_LAMBDA_NAME, {
    architecture: Architecture.X86_64,
    runtime: Runtime.NODEJS_16_X,
    entry: path.join(__dirname, 'handler.ts'),
    handler: 'main',
  });

  // duplicate lambda to fail no mono lambda rule
  new NodejsFunction(stack, FAIL_ARM64_LAMBDA_NAME_BIS, {
    architecture: Architecture.X86_64,
    runtime: Runtime.NODEJS_16_X,
    entry: path.join(__dirname, 'handler.ts'),
    handler: 'main',
  });
};
