import { config } from 'dotenv';
import { unlinkSync, writeFileSync } from 'fs';
import { getGuardianResults } from './getGuardianResults';

export const setup = async (): Promise<void> => {
  config({ path: '.env' });

  const checkResults = await getGuardianResults({
    awsProfile: process.env.AWS_PROFILE,
    awsRegion: process.env.AWS_REGION,
    noFail: true,
    short: false,
    getJsonResults: true,
  });

  writeFileSync('./tests/guardianOutput.json', JSON.stringify(checkResults));
};

export const teardown = (): void => {
  unlinkSync('./tests/guardianOutput.json');
};
