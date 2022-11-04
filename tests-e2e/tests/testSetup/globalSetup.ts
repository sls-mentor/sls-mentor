import { unlinkSync, writeFileSync } from 'fs';
import { getGuardianResults } from './getGuardianResults';

export const setup = async (): Promise<void> => {
  const checkResults = await getGuardianResults({
    awsRegion: 'eu-west-1',
    noFail: true,
    short: false,
    getJsonResults: true,
  });
  // sleep 20s
  writeFileSync('./tests/guardianOutput.json', JSON.stringify(checkResults));
};

export const teardown = (): void => {
  unlinkSync('./tests/guardianOutput.json');
};
