import clsx from 'clsx';
import { useMemo } from 'react';
import { getColorClassName } from '../helpers';
import { useAnimatedAmount, useReportContext } from '../hooks';

import styles from './mainScore.module.css';
import { getOverallPercentage } from '@sls-mentor/core';

export const MainScore = (): JSX.Element => {
  const { passingResourcesByRule } = useReportContext();

  const percentage = useMemo(
    () => getOverallPercentage(passingResourcesByRule),

    [passingResourcesByRule],
  );

  const livePercentage = useAnimatedAmount(percentage);

  return (
    <div className={styles.container}>
      <h3>Your global score:</h3>
      <h1
        className={clsx(
          styles.mainScore,
          styles[getColorClassName(livePercentage)],
        )}
        style={{ position: 'absolute' }}
      >
        {livePercentage.toFixed(0)}
        <span className={styles.percent}>%</span>
      </h1>
      <h1 className={styles.mainScore} style={{ opacity: 0 }}>
        {percentage.toFixed(0)}
        <span className={styles.percent}>%</span>
      </h1>
    </div>
  );
};
