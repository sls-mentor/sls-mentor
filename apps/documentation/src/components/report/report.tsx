import { useLocation } from '@docusaurus/router';
import React, { useMemo } from 'react';
import { ReportContext } from './hooks';
import { parseParams } from './parseParams';

export const Report = (): JSX.Element => {
  const { search: queryString } = useLocation();

  const parsedQueryString = useMemo(
    () => parseParams(queryString),
    [queryString],
  );

  if (parsedQueryString === undefined) {
    return <main></main>;
  }

  return (
    <main>
      <ReportContext.Provider value={parsedQueryString}>
        <h1>Report</h1>
      </ReportContext.Provider>
    </main>
  );
};
