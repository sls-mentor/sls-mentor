import { Category, categoryNames } from '@sls-mentor/rules';
import clsx from 'clsx';
import styles from './bars.module.css';
import { useAnimatedAmount, useReportContext } from '../hooks';
import { getColorClassName } from '../helpers';
import { getPercentageFromPassingResources } from '@sls-mentor/core';

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
  const { passingResourcesByCategory } = useReportContext();

  return (
    <div className={styles.barsContainer}>
      {Object.entries(passingResourcesByCategory).map(
        ([category, { passingResourcesAmount, totalResourcesAmount }]) => (
          <Bar
            percentage={getPercentageFromPassingResources({
              passingResourcesAmount,
              totalResourcesAmount,
            })}
            category={category as Category}
            key={category}
          />
        ),
      )}
    </div>
  );
};
