import { App } from 'aws-cdk-lib';

import { StackFail } from './stackFail';
import { StackSuccess } from './stackSuccess';

export const STACK_FAIL_NAME = 'sls-mentor-e2e-stack-fail';
export const STACK_SUCCESS_NAME = 'sls-mentor-e2e-stack-success';

const app = new App();

new StackFail(app, STACK_FAIL_NAME, {});
new StackSuccess(app, STACK_SUCCESS_NAME, {});
