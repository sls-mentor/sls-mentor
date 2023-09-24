import useBaseUrl from '@docusaurus/useBaseUrl';
import { UilAngleLeftB, UilAngleRightB } from '@iconscout/react-unicons';
import groupBy from 'lodash/groupBy';
import uniq from 'lodash/uniq';
import React from 'react';

import { allRules, SLS_MENTOR_LEVELS } from '@sls-mentor/rules';

import styles from './levelChoice.module.css';

const RULES_BY_LEVEL = groupBy(allRules, 'level');
const SERVICES_BY_LEVEL = SLS_MENTOR_LEVELS.map(level =>
  uniq(
    RULES_BY_LEVEL[level]
      .filter(({ level: l }) => l === level)
      .map(({ service }) => service),
  ),
);

export const LevelChoice = (): JSX.Element => {
  const path = useBaseUrl('');

  return (
    <div className={styles.container}>
      <h6>Chose a level of difficulty:</h6>
      <div className={styles.innerContainer}>
        <div className={styles.innerCard}>
          <div className={styles.metro}>
            <div className={styles.gradient}>
              {SERVICES_BY_LEVEL.map((services, level) => (
                <div
                  className={styles.circle}
                  onClick={() => (window.location.href = `${path}/docs/intro`)}
                  key={level}
                >
                  <div className={styles.levelDetails}>
                    <p>Level {level + 1}</p>
                    <div className={styles.services}>
                      {services.map(service => (
                        <img
                          src={`${path}/img/services/${service}.svg`}
                          key={service}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.arrows}>
            <p>
              <UilAngleLeftB className={styles.icon} />
              <UilAngleLeftB className={styles.icon} />
              <UilAngleLeftB className={styles.icon} />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Higher impact
            </p>
            <p>
              Harder to fix&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <UilAngleRightB className={styles.icon} />
              <UilAngleRightB className={styles.icon} />
              <UilAngleRightB className={styles.icon} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
