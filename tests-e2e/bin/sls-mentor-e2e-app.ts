#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { SlsMentorE2EStackFail } from '../lib/failStack/sls-mentor-e2e-stack-fail';
import { SlsMentorE2EStackPass } from '../lib/passStack/sls-mentor-e2e-stack-pass';

export const SLS_MENTOR_E2E_STACK_PASS_NAME = 'sls-mentor-e2e-pass';
export const SLS_MENTOR_E2E_STACK_FAIL_NAME = 'sls-mentor-e2e-fail';

const app = new cdk.App();

new SlsMentorE2EStackFail(app, SLS_MENTOR_E2E_STACK_PASS_NAME, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

new SlsMentorE2EStackPass(app, SLS_MENTOR_E2E_STACK_FAIL_NAME, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
