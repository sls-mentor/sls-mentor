import { config } from 'dotenv';
import { unlinkSync, writeFileSync } from 'fs';
import { getSlsMentorResult } from './getSlsMentorResults';

export const setup = async (): Promise<void> => {
  config({ path: '.env' });

  const checkResults = await getSlsMentorResult({
    awsProfile: process.env.AWS_PROFILE,
    awsRegion: process.env.AWS_REGION,
    noFail: true,
    short: false,
    getJsonResults: true,
    level: '5',
  });

  writeFileSync('./tests/slsMentorOutput.json', JSON.stringify(checkResults));
};

export const teardown = (): void => {
  unlinkSync('./tests/slsMentorOutput.json');
};
