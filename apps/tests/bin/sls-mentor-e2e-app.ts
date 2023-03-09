#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import { StackFail } from '../lib/stackFail';
import { StackSuccess } from '../lib/stackSuccess';

const app = new App();

new StackFail(app, 'StackFail', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});

new StackSuccess(app, 'StackSuccess', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
