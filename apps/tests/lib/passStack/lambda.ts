import * as cdk from 'aws-cdk-lib';
import {
  Architecture,
  Function,
  InlineCode,
  Runtime,
} from 'aws-cdk-lib/aws-lambda';
import { RetentionDays } from 'aws-cdk-lib/aws-logs';
import { lambdaInlineCode } from '../common/lambdaInlineCode';

export const PASS_ARM64_LAMBDA_NAME = 'PassArm64Lambda';

export const PASS_NO_MONO_LAMBDA_NAME = 'PassNoMonoLambda';

export const PASS_LIGHT_BUNDLE_LAMBDA_NAME = 'PassLightBundleLambda';

export const PASS_NO_DEFAULT_MEMORY_LAMBDA_NAME = 'PassNoDefaultMemoryLambda';

export const setupLambda = (stack: cdk.Stack): void => {
  new Function(stack, PASS_ARM64_LAMBDA_NAME, {
    architecture: Architecture.ARM_64,
    runtime: Runtime.NODEJS_16_X,
    code: lambdaInlineCode,
    handler: 'index.handler',
    logRetention: RetentionDays.ONE_DAY,
  });

  new Function(stack, PASS_NO_MONO_LAMBDA_NAME, {
    runtime: Runtime.NODEJS_16_X,
    code: InlineCode.fromInline(
      'exports.handler = async () => { return "I am unique!!!!" }',
    ),
    handler: 'index.handler',
  });

  new Function(stack, PASS_LIGHT_BUNDLE_LAMBDA_NAME, {
    runtime: Runtime.NODEJS_16_X,
    code: lambdaInlineCode,
    handler: 'index.handler',
  });

  new Function(stack, PASS_NO_DEFAULT_MEMORY_LAMBDA_NAME, {
    runtime: Runtime.NODEJS_16_X,
    memorySize: 128,
    code: lambdaInlineCode,
    handler: 'index.handler',
  });
};
