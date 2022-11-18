#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { GuardianE2EStackFail } from '../lib/guardian-e2e-stack-fail';
import { GuardianE2EStackPass } from '../lib/guardian-e2e-stack-pass';

const app = new cdk.App();

export const GUARDIAN_E2E_STACK_PASS_NAME = 'guardian-e2e-pass';
export const GUARDIAN_E2E_STACK_FAIL_NAME = 'guardian-e2e-fail';

new GuardianE2EStackPass(app, GUARDIAN_E2E_STACK_PASS_NAME, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

new GuardianE2EStackFail(app, GUARDIAN_E2E_STACK_FAIL_NAME, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
