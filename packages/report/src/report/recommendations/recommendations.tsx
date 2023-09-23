import { allRules, Service } from '@sls-mentor/rules';
import { useMemo } from 'react';
import { getRecommendations } from '../helpers';
import { useReportContext } from '../hooks';
import { Tag } from '../types';
import styles from './recommendations.module.css';
import { AwsIcons } from '../../assets/iconComponents';

const getRuleName = (ruleName: string): string => {
  const rule = allRules.find(({ fileName }) => fileName === ruleName);

  return rule?.ruleName ?? '';
};

const getTagName = (tag: Tag): string => {
  switch (tag) {
    case 'critical':
      return 'Critical 🚨';
    case 'high':
      return 'High 🔴';
    case 'medium':
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
  const path = 'https://sls-mentor.dev';

  const { passingResourcesByRule } = useReportContext();
  const recommendations = useMemo(
    () => getRecommendations(passingResourcesByRule),
    [passingResourcesByRule],
  );

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
                <div className={styles.logo}>
                  {AwsIcons[service as Service]}
                </div>
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
