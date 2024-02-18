import React from 'react';

import styles from './contributors.module.css';

export const Contributors = (): JSX.Element => (
  <div className={styles.contributors}>
    <h4>
      Thanks to our contributors!{' '}
      <a
        className={styles.contribute}
        href="https://www.github.com/sls-mentor/sls-mentor"
      >
        Join us!
      </a>
    </h4>
    <img
      src="https://contrib.rocks/image?repo=sls-mentor/sls-mentor"
      data-canonical-src="https://contrib.rocks/image?repo=sls-mentor/sls-mentor"
      className={styles.big}
    />
    <img src="https://contrib.rocks/image?repo=aleios-cloud/sls-dev-tools" />
  </div>
);
