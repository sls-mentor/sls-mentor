import {
  UilCell,
  UilRocket,
  UilShieldCheck,
  UilTrees,
  UilUsdCircle,
} from '@iconscout/react-unicons';
import clsx from 'clsx';
import React from 'react';

import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './dashboard.module.css';

const categories = {
  'Green IT': {
    details:
      'We help you leverage serverless technologies full potential to reduce you footprint.',
    Icon: <UilTrees size={16} />,
    defaultScore: '30%',
    defaultColor: 'red',
  },
  Security: {
    details:
      'We detect potential loopholes in your critical resources configuration.',
    Icon: <UilShieldCheck size={16} />,
    defaultScore: '70%',
    defaultColor: 'orange',
  },
  Speed: {
    details:
      'We find the best configurations to increase your computation speed.',
    Icon: <UilRocket size={16} />,
    defaultScore: '100%',
    defaultColor: 'green',
  },
  'IT Costs': {
    details:
      'We make sure you can scale your resources to zero, and to infinity (but not too fast!)',
    Icon: <UilUsdCircle size={16} />,
    defaultScore: '40%',
    defaultColor: 'red',
  },
  Stability: {
    details:
      'Every best practice that helps you avoid bugs, and solidify your architecture.',
    Icon: <UilCell size={16} />,
    defaultScore: '80%',
    defaultColor: 'green',
  },
} as const;

type Category = keyof typeof categories;

export const Dashboard = (): JSX.Element => {
  const [selectedCategory, setSelectedCategory] = React.useState<Category>();

  return (
    <div className={styles.container}>
      <h6>Main dashboard</h6>
      <div className={styles.innerContainer}>
        <div className={styles.innerCard}>
          <p>sls-mentor rates your application based on 5 axes:</p>
          <div className={styles.detailsContainer}>
            <div className={styles.chipsContainer}>
              {Object.keys(categories).map(category => (
                <div
                  className={clsx(
                    styles.chip,
                    category === selectedCategory ? styles.selected : undefined,
                  )}
                  key={category}
                  onClick={() =>
                    setSelectedCategory(
                      category !== selectedCategory
                        ? (category as Category)
                        : undefined,
                    )
                  }
                >
                  <p>{category}</p>
                  {categories[category as Category].Icon}
                </div>
              ))}
            </div>
            {selectedCategory === undefined ? (
              <div className={styles.detailsPlaceholder}>
                <img src={useBaseUrl('img/sls-mentor.svg')} />
              </div>
            ) : (
              <div className={styles.details}>
                <h5>
                  {selectedCategory}&nbsp;
                  {categories[selectedCategory].Icon}
                </h5>
                <p>{categories[selectedCategory].details}</p>
                <p className={styles.moreOnCategory}>
                  <a>Learn more...</a>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.innerCard}>
          <div className={styles.graph}>
            {Object.keys(categories).map(category => (
              <div className={styles.graphBarContainer}>
                <div
                  className={clsx(
                    styles.graphBar,
                    category === selectedCategory
                      ? styles.green
                      : selectedCategory === undefined
                      ? styles[categories[category as Category].defaultColor]
                      : styles.red,
                  )}
                  style={{
                    height:
                      category === selectedCategory
                        ? '100%'
                        : selectedCategory === undefined
                        ? categories[category as Category].defaultScore
                        : '20%',
                  }}
                ></div>
                <p>
                  {category}&nbsp;{categories[category as Category].Icon}
                </p>
              </div>
            ))}
          </div>
          <div className={styles.gradient}></div>
        </div>
      </div>
    </div>
  );
};
