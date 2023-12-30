import { Data } from '@sls-mentor/graph-core';
import { mockResults } from './mock';
import { LiveGraph } from './LiveGraph';
import { CustomARN } from '@sls-mentor/arn';

import './global.css';

const loadResults = () => {
  // Designed to be replaced by the CLI after the build step, will not work in dev mode!
  return JSON.parse('<<SLS-RESULTS-PLACEHOLDER>>') as Data;
};

const isProd = import.meta.env.PROD;

const App = (): JSX.Element => {
  const data = isProd ? loadResults() : mockResults;

  const firstArn = Object.keys(data.nodes)[0] ?? '';
  const [, partition, , region, accountId] = firstArn.split(':');

  if (
    accountId === undefined ||
    region === undefined ||
    partition === undefined
  ) {
    return <div>Failed to parse the first ARN from the results</div>;
  }

  CustomARN.setup({ accountId, region, partition });

  return <LiveGraph data={isProd ? loadResults() : mockResults} />;
};

export default App;
