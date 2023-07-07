import { SlsMentorResults } from '@sls-mentor/core';
import { Bars } from './bars';
import { ReportContext } from './hooks';
import { MainScore } from './mainScore';
import { Recommendations } from './recommendations';

import styles from './report.module.css';
import { SlsMentorIcon } from '../assets/iconComponents';

export const Report = ({
  slsMentorResults,
}: {
  slsMentorResults: SlsMentorResults;
}): JSX.Element => (
  <>
    <div className={styles.reportHeader}>
      <div className={styles.logo}>{SlsMentorIcon}</div>
      <h1>sls-mentor</h1>
    </div>
    <main>
      <ReportContext.Provider value={slsMentorResults}>
        <div className={styles.reportContainer}>
          <div className={styles.headerContainer}>
            <MainScore />
            <Bars />
          </div>
          <Recommendations />
        </div>
      </ReportContext.Provider>
    </main>
  </>
);
