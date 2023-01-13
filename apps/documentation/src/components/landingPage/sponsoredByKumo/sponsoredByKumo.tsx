import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';
import styles from './sponsoredByKumo.module.css';

export const SponsoredByKumo = (): JSX.Element => (
  <div className={styles.container}>
    <div
      className={styles.link}
      onClick={() =>
        (window.location.href = 'https://twitter.com/kumoserverless')
      }
    >
      <p className={styles.text}>Sponsored by</p>
      <img
        className={styles.logo}
        src={useBaseUrl('/img/kumo.svg')}
        alt="logo-kumo"
      />
    </div>
  </div>
);
