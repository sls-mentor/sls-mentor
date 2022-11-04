#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import 'source-map-support/register';
import { GuardianE2EStack1 } from '../lib/guardian-e2e-stack-1';

const app = new cdk.App();

const GUARDIAN_E2E_STACK_1_NAME = 'guardian-e2e-1';
new GuardianE2EStack1(app, GUARDIAN_E2E_STACK_1_NAME, {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: 'eu-west-1',
  },
});
