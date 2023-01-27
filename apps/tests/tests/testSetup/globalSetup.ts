import { config } from 'dotenv';
import { unlinkSync, writeFileSync } from 'fs';
import { getSlsMentorResult } from './getSlsMentorResults';
import {
  SLS_MENTOR_E2E_STACK_FAIL_NAME,
  SLS_MENTOR_E2E_STACK_PASS_NAME,
} from '../../bin/sls-mentor-e2e-app';

export const setup = async (): Promise<void> => {
  config({ path: '.env' });

  const checkResults = await getSlsMentorResult({
    awsProfile: process.env.AWS_PROFILE,
    awsRegion: process.env.AWS_REGION,
    noFail: true,
    short: false,
    getJsonResults: true,
    level: '5',
    cloudformationStacks: [
      SLS_MENTOR_E2E_STACK_PASS_NAME,
      SLS_MENTOR_E2E_STACK_FAIL_NAME,
    ],
  });

  writeFileSync('./tests/slsMentorOutput.json', JSON.stringify(checkResults));
};

export const teardown = (): void => {
  unlinkSync('./tests/slsMentorOutput.json');
};
