import Layout from '@theme/Layout';
import React from 'react';

import {
  CodeBlock,
  Dashboard,
  LevelChoice,
  ResourceByResource,
  RuleByRule,
} from '../../components';
import styles from './index.module.css';

const GettingStarted = (): JSX.Element => (
  <Layout title="Getting started" description="Getting started with sls-mentor">
    <main>
      <h2>Getting started</h2>
      <h4 className={styles.subtitle}>A single command to analyze your app</h4>
      <CodeBlock
        label="In your CLI:"
        command="npx sls-mentor"
        commandSecondary="@latest"
        tip={
          <p>
            Encounter an error ? Try specifying an AWS profile with -p or a
            region with -r
          </p>
        }
      />
      <LevelChoice />
      <h4 className={styles.subtitle}>Reading the results</h4>
      <Dashboard />
      <RuleByRule />
      <ResourceByResource />
    </main>
  </Layout>
);

export default GettingStarted;
