import * as cdk from 'aws-cdk-lib';
import {
  Architecture,
  Function,
  InlineCode,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';

export const FAIL_ARM64_LAMBDA_NAME = 'FailArm64Lambda';

export const setupLambda = (stack: cdk.Stack): void => {
  new Function(stack, FAIL_ARM64_LAMBDA_NAME, {
    architecture: Architecture.X86_64,
    runtime: Runtime.NODEJS_16_X,
    code: InlineCode.fromInline(
      'exports.handler = async () => { return "hello world" }',
    ),
    handler: 'index.handler',
  });
};
