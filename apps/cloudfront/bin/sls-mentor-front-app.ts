#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import 'source-map-support/register';
import { SlsMentorFrontStack } from '../lib/front/sls-mentor-front-stack';

export const SLS_MENTOR_FRONT_STACK_NAME = 'sls-mentor-front-stack';

const app = new App();

new SlsMentorFrontStack(app, SLS_MENTOR_FRONT_STACK_NAME, {
  env: {
    account: process.env.ACCOUNT_ID,
    region: 'eu-west-1',
  },
});
