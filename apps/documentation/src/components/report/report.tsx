import { useLocation } from '@docusaurus/router';
import React, { useMemo } from 'react';
import { Bars } from './bars';
import { ReportContext } from './hooks';
import { MainScore } from './mainScore';
import { parseParams } from './helpers';

import styles from './report.module.css';

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
        <div className={styles.headerContainer}>
          <MainScore />
          <Bars />
        </div>
      </ReportContext.Provider>
    </main>
  );
};
