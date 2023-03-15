import Layout from '@theme/Layout';
import React from 'react';
import { Report } from '../../components';

const ReportPage = (): JSX.Element => (
  <Layout title="Report" description="Your analysis details">
    <Report />
    <p style={{ textAlign: 'center', color: 'var(--grey-low-contrast)' }}>
      <u>Note</u>: This page was generated based on 100% anonymized data.
      <br />
      We only analyze rules passing percentages, your resources ARNs stay in
      your CLI.
      <br />
      We DO NOT store any data anywhere.
    </p>
  </Layout>
);

export default ReportPage;
