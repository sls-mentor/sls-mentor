import React, { useMemo } from 'react';
import { Category, categoryNames } from '@sls-mentor/core';
import clsx from 'clsx';
import styles from './bars.module.css';
import { useAnimatedAmount, useReportContext } from '../hooks';
import { getColorClassName, getResultsByCategory } from '../helpers';

const Bar = ({
  percentage,
  category,
}: {
  percentage: number;
  category: Category;
}): JSX.Element => {
  const livePercentage = useAnimatedAmount(percentage);

  return (
    <div className={styles.barContainer}>
      <div
        className={clsx(styles.bar, styles[getColorClassName(livePercentage)])}
        style={{
          width: `calc(${livePercentage / 100} * (100% - 100px))`,
        }}
      >
        <p>
          {categoryNames[category]}
          <br />
          {livePercentage.toFixed(0)}%
        </p>
      </div>
    </div>
  );
};

export const Bars = (): JSX.Element => {
  const { results } = useReportContext();
  const resultsByCategory = useMemo(
    () => getResultsByCategory(results),
    [results],
  );

  return (
    <div className={styles.barsContainer}>
      {Object.entries(resultsByCategory).map(
        ([category, { passingResources, totalResources }]) => {
          const percentage =
            totalResources > 0 ? (100 * passingResources) / totalResources : 0;

          return (
            <Bar percentage={percentage} category={category as Category} />
          );
        },
      )}
    </div>
  );
};
