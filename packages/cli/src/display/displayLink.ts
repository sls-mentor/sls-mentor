import chalk from 'chalk';
import terminalLink from 'terminal-link';
import { ChecksResults } from 'types';
import { LILA_HEX } from '../constants';

const LOCAL_LINK = 'http://localhost:3000';
const STAGING_LINK = 'https://www.dev.sls-mentor.dev';
const PROD_LINK = 'https://www.sls-mentor.dev';

const getBaseLink = () => {
  if (process.env.STAGE === 'local') {
    return LOCAL_LINK;
  }

  if (process.env.STAGE === 'staging') {
    return STAGING_LINK;
  }

  return PROD_LINK;
};

export const displayLink = (
  checksResults: ChecksResults,
  level: number,
): void => {
  const baseLink = getBaseLink();

  const queryParams = checksResults
    .map(({ result, rule: { fileName } }) => {
      const passing = result.filter(({ success }) => success).length;
      const total = result.length;

      return `${fileName}=${passing}/${total}`;
    })
    .join('&');

  const url = `${baseLink}/report/?${queryParams}&level=${level}`;

  const link = terminalLink(chalk.bold.hex('##0095ff')('Click here!'), url);

  console.log(
    chalk.hex(LILA_HEX)(
      '\n\n ⬇️  [NEW!] Follow this link to see a detailed report of your analysis ⬇️\n',
    ),
  );
  console.log(` ➡️  ${link}`);
  console.log('\n');
};
