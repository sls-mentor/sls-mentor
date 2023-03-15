import { useLocation } from '@docusaurus/router';
import React, { useMemo } from 'react';
import { Bars } from './bars';
import { parseParams } from './helpers';
import { ReportContext } from './hooks';
import { MainScore } from './mainScore';
import { Recommendations } from './recommendations';

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
        <Recommendations />
      </ReportContext.Provider>
    </main>
  );
};
