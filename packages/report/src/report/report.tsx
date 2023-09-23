import { Bars } from './bars';
import { ReportContext } from './hooks';
import { MainScore } from './mainScore';
import { Recommendations } from './recommendations';

import styles from './report.module.css';
import { SlsMentorIcon } from '../assets/iconComponents';
import {
  PassingResourcesByCategory,
  PassingResourcesByRule,
} from '@sls-mentor/core';

export const Report = ({
  slsMentorResults: { passingResourcesByCategory, passingResourcesByRule },
}: {
  slsMentorResults: {
    passingResourcesByCategory: PassingResourcesByCategory;
    passingResourcesByRule: PassingResourcesByRule;
  };
}): JSX.Element => (
  <>
    <div className={styles.reportHeader}>
      <div className={styles.logo}>{SlsMentorIcon}</div>
      <h1>sls-mentor</h1>
    </div>
    <main>
      <ReportContext.Provider
        value={{ passingResourcesByCategory, passingResourcesByRule }}
      >
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
