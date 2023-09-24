import { Report } from './report';
import { mockResults } from './mockResults';

import './global.css';
import {
  PassingResourcesByCategory,
  PassingResourcesByRule,
} from '@sls-mentor/core';

const isProd = import.meta.env.PROD;

const loadResults = () => {
  return JSON.parse('<<SLS-RESULTS-PLACEHOLDER>>') as {
    passingResourcesByRule: PassingResourcesByRule;
    passingResourcesByCategory: PassingResourcesByCategory;
  };
};

const App = (): JSX.Element => (
  <Report slsMentorResults={isProd ? loadResults() : mockResults} />
);
export default App;
