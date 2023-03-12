import clsx from 'clsx';
import React, { useMemo } from 'react';
import { getColorClassName } from '../helpers';
import { useAnimatedAmount, useReportContext } from '../hooks';

import styles from './mainScore.module.css';

export const MainScore = (): JSX.Element => {
  const { results } = useReportContext();

  const percentage = useMemo(() => {
    const { passing, total } = Object.values(results).reduce(
      (acc, { passingResources, totalResources }) => ({
        passing: acc.passing + passingResources,
        total: acc.total + totalResources,
      }),
      { passing: 0, total: 0 },
    );

    return (100 * passing) / total;
  }, [results]);

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
