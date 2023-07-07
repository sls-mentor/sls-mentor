import { SlsMentorResults } from '@sls-mentor/core';
import { Report } from './report';
//import results from './mockResults.json';

import './global.css';

const results = JSON.parse('<<SLS-RESULTS-PLACEHOLDER>>') as unknown;

const App = (): JSX.Element => (
  <Report slsMentorResults={results as SlsMentorResults} />
);
export default App;
