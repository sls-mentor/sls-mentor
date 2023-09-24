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
      src="https://camo.githubusercontent.com/e15fd7b4ab72a2122694d3bee1d20a77b25f4495a5184e932a7bd2cc763f7604/68747470733a2f2f636f6e747269622e726f636b732f696d6167653f7265706f3d6b756d6f2d62792d7468656f646f2f677561726469616e"
      data-canonical-src="https://contrib.rocks/image?repo=sls-mentor/sls-mentor"
      className={styles.big}
    />
    <img
      src="https://camo.githubusercontent.com/bb77793a577ff457febad46abffe21875cbcbbf6ca08b14a03c2993a4f3258d2/68747470733a2f2f636f6e747269622e726f636b732f696d6167653f7265706f3d616c65696f732d636c6f75642f736c732d6465762d746f6f6c73"
      data-canonical-src="https://contrib.rocks/image?repo=aleios-cloud/sls-dev-tools"
    />
  </div>
);
