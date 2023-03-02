import React from 'react';

import useBaseUrl from '@docusaurus/useBaseUrl';
import { rules as allRules, SERVICES } from '@sls-mentor/core';
import clsx from 'clsx';
import groupBy from 'lodash/groupBy';
import styles from './ruleByRule.module.css';

const ruleBars = [
  {
    label: 'Lambda: Use ARM architecture',
    score: '75%',
    color: 'orange',
    link: 'docs/rules/useARM',
  },
  {
    label: 'S3: Use intelligent tiering',
    score: '85%',
    color: 'green',
    link: 'docs/rules/useIntelligentTiering',
  },
  {
    label: 'Api Gateway V2: Use authorizers',
    score: '20%',
    color: 'red',
    link: 'docs/rules/noUnauthorizedApiGatewaysV2Routes',
  },
  {
    label: 'Lambda: Limited amount of versions',
    score: '80%',
    color: 'green',
    link: 'docs/rules/limitedAmountOfVersions',
  },
  {
    label: 'Lambda: Small bundle size',
    score: '50%',
    color: 'orange',
    link: 'docs/rules/lightBundle',
  },
  {
    label: 'CloudWatch: Define log retention period',
    score: '40%',
    color: 'red',
    link: 'docs/rules/definedLogsRetentionDuration',
  },
  {
    label: 'CloudFront: Specify security headers',
    score: '60%',
    color: 'orange',
    link: 'docs/rules/cloudFrontSecurityHeaders',
  },
  {
    label: 'S3: Enable server-side encryption',
    score: '90%',
    color: 'green',
    link: 'docs/rules/serverSideEncryptionEnabled',
  },
];
const RULES_BY_SERVICE = groupBy(allRules, 'service');

export const RuleByRule = (): JSX.Element => {
  const nbOfRules = Object.values(RULES_BY_SERVICE).reduce(
    (p, c) => p + c.length,
    0,
  );
  const nbOfServices = SERVICES.length;

  const path = useBaseUrl('');

  return (
    <div className={styles.container}>
      <h6>Rule-by-rule results</h6>
      <div className={styles.innerContainer}>
        <div className={styles.innerCard}>
          <p>We apply rules on your resources configuration</p>
          <div className={styles.servicesContainer}>
            {Object.entries(RULES_BY_SERVICE).map(([service, rules]) => (
              <div className={styles.service} key={service}>
                <img
                  src={`${path}/img/services/${service}.svg`}
                  onClick={() => (window.location.href = `${path}/docs/intro`)}
                />
                <p>
                  {rules.length} rule{rules.length > 1 && 's'}
                </p>
              </div>
            ))}
          </div>
          <p>
            We already feature <b>{nbOfRules} rules</b> in
            <b>{nbOfServices} AWS services</b>!
          </p>
        </div>
        <div className={styles.innerCard}>
          <div className={styles.ruleBars}>
            {ruleBars.map(({ label, score, color, link }) => (
              <div
                className={styles.rule}
                key={label}
                onClick={() => (window.location.href = `${path}/${link}`)}
              >
                <p>{label}</p>
                <div className={styles.ruleBar}>
                  <div
                    className={clsx(styles.ruleBarContent, styles[color])}
                    style={{
                      width: score,
                      transition: 'width 1s, background 1s',
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
