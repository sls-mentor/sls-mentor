import useBaseUrl from '@docusaurus/useBaseUrl';
import React from 'react';

import styles from './sponsoredByTheodo.module.css';

export const SponsoredByTheodo = (): JSX.Element => (
  <div className={styles.container}>
    <div
      className={styles.link}
      onClick={() => (window.location.href = 'https://twitter.com/slsByTheodo')}
    >
      <p className={styles.text}>Sponsored by</p>
      <img
        className={styles.logo}
        src={useBaseUrl('/img/theodo.svg')}
        alt="Theodo"
      />
    </div>
  </div>
);
