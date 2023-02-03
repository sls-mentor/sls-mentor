import * as cdk from 'aws-cdk-lib';
import {
  Architecture,
  Function,
  InlineCode,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import path from 'path';

export const FAIL_ARM64_LAMBDA_NAME = 'FailArm64Lambda';

export const FAIL_NO_MONO_LAMBDA_NAME = 'FailNoMonoLambda';
export const FAIL_NO_MONO_LAMBDA_NAME_BIS = 'FailNoMonoLambdaBis';

export const FAIL_LIGHT_BUNDLE_LAMBDA_NAME = 'FailLightBundleLambda';


export const setupLambda = (stack: cdk.Stack): void => {
  new NodejsFunction(stack, FAIL_ARM64_LAMBDA_NAME, {
    architecture: Architecture.X86_64,
    runtime: Runtime.NODEJS_16_X,
    entry: path.join(__dirname, 'handler.ts'),
    handler: 'main',
  });

  // duplicated lambdas to fail no mono lambda rule
  new Function(stack, FAIL_NO_MONO_LAMBDA_NAME, {
    runtime: Runtime.NODEJS_16_X,
    code: InlineCode.fromInline(
      'exports.handler = async () => { return "hello world" }',
    ),
    handler: 'index.handler',
  });

  new Function(stack, FAIL_NO_MONO_LAMBDA_NAME_BIS, {
    runtime: Runtime.NODEJS_16_X,
    code: InlineCode.fromInline(
      'exports.handler = async () => { return "hello world" }',
    ),
    handler: 'index.handler',
  });

  // lambda with huge package to fail light bundle rule
  new NodejsFunction(stack, FAIL_LIGHT_BUNDLE_LAMBDA_NAME, {
    runtime: Runtime.NODEJS_16_X,
    entry: path.join(__dirname, 'handler.ts'),
    handler: 'main',
  });
};
