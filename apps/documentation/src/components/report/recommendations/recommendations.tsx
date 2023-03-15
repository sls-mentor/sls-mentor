import useBaseUrl from '@docusaurus/useBaseUrl';
import { rules } from '@sls-mentor/core';
import React from 'react';
import { useReportContext } from '../hooks';
import styles from './recommendations.module.css';

const getRuleName = (ruleName: string): string => {
  const rule = rules.find(({ fileName }) => fileName === ruleName);

  return rule?.ruleName ?? '';
};

const getTagName = (tag: string): string => {
  switch (tag) {
    case 'critical':
      return 'Critical 🚨';
    case 'high':
      return 'High 🔴';
    case 'moderate':
      return 'Moderate 🟡';
    case 'low':
      return 'Low 🟢';
    case 'quick-fix':
      return 'Quick fix 🚀';
    default:
      return '';
  }
};

export const Recommendations = (): JSX.Element => {
  const { results } = useReportContext();
  console.log(results);
  const path = useBaseUrl('');

  const recommendations = [
    {
      service: 'Lambda',
      tags: ['quick-fix', 'critical'],
      ruleName: 'noSharedIamRoles',
    },
    {
      service: 'S3',
      tags: ['quick-fix', 'moderate'],
      ruleName: 'useIntelligentTiering',
    },
    {
      service: 'Lambda',
      tags: ['low'],
      ruleName: 'lightBundle',
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <h3>Based on your results, here are some tips to improve your score:</h3>
      <div className={styles.recommendationsContainer}>
        {recommendations.map(({ service, tags, ruleName }, index) => (
          <div
            className={styles.recommendationCard}
            key={ruleName}
            onClick={() =>
              (window.location.href = `${path}/docs/rules/${ruleName}`)
            }
          >
            <div className={styles.recommendationHeader}>
              <h2>{index + 1}</h2>
              <h3>{getRuleName(ruleName)}</h3>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.recommendationBody}>
              <div className={styles.service}>
                <img src={`${path}/img/services/${service}.svg`} />
              </div>
              <div className={styles.tagsContainer}>
                {tags.map(tag => (
                  <p className={styles[tag]} key={tag}>
                    {getTagName(tag)}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
