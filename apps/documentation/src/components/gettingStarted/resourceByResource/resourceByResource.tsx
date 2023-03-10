import useBaseUrl from '@docusaurus/useBaseUrl';
import clsx from 'clsx';
import React from 'react';

import styles from './resourceByResource.module.css';

export const ResourceByResource = (): JSX.Element => {
  const path = useBaseUrl('');

  const naivateToRule = (ruleName: string): void => {
    window.location.href = `${path}/docs/rules/${ruleName}`;
  };

  return (
    <div className={styles.container}>
      <h6>Resource-by-resource results</h6>
      <div className={styles.innerContainer}>
        <div className={styles.innerCard}>
          <p>Monitor your resources individually</p>
          <div className={styles.resourceContainer}>
            <div className={styles.group1}>
              <div className={styles.resource}>
                <img src={path + '/img/services/S3.svg'} />
                <div className={clsx(styles.line, styles.line11)}></div>
                <div className={clsx(styles.line, styles.line12)}></div>
                <p
                  className={styles.rule1}
                  onClick={() => naivateToRule('useIntelligentTiering')}
                >
                  ❌ UseIntelligentTiering
                </p>
                <div className={clsx(styles.line, styles.line21)}></div>
                <div className={clsx(styles.line, styles.line22)}></div>
                <p
                  className={styles.rule2}
                  onClick={() => naivateToRule('s3OnlyAllowHTTPS')}
                >
                  ✅ OnlyAllowHTTPS
                </p>
                <p className={styles.resourceName}>Invoices</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.innerCard}>
          <p>Like a linter, debug your application step-by-step</p>
          <div className={styles.resourceContainer}>
            <div className={styles.group2}>
              <div className={styles.resource}>
                <img src={path + '/img/services/Lambda.svg'} />
                <div className={clsx(styles.line, styles.line11)}></div>
                <div className={clsx(styles.line, styles.line12)}></div>
                <p
                  className={styles.rule1}
                  onClick={() => naivateToRule('useArm')}
                >
                  ❌ UseArm
                </p>
                <div className={clsx(styles.line, styles.line21)}></div>
                <div className={clsx(styles.line, styles.line22)}></div>
                <p
                  className={styles.rule2}
                  onClick={() => naivateToRule('lightBundle')}
                >
                  ✅ LightBundle
                </p>
                <p className={styles.resourceName}>ListUsers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
