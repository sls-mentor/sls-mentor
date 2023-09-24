#!/usr/bin/env node
import { App } from 'aws-cdk-lib';

import { SlsMentorFrontStack } from './sls-mentor-front-stack';

const app = new App();

const stage = process.env.STAGE;
if (stage === undefined) {
  throw new Error('Stage is undefined');
}

export const SLS_MENTOR_FRONT_STACK_NAME = `${
  stage === 'dev' ? 'dev' : ''
}sls-mentor-front-deploy`;

new SlsMentorFrontStack(app, SLS_MENTOR_FRONT_STACK_NAME, {
  env: {
    region: process.env.AWS_REGION,
  },
  stage,
});
