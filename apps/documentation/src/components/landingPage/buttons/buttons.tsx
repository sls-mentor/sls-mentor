import clsx from 'clsx';
import React from 'react';
import styles from './buttons.module.css';

export const Buttons = (): JSX.Element => (
  <div className={styles['buttons-container']}>
    <button
      onClick={() => (window.location.href = 'gettingStarted')}
      className={clsx(styles.button, styles.important)}
    >
      <b>Start analysing!</b>
    </button>
    <button
      onClick={() => (window.location.href = 'slsMentorLevels')}
      className={styles.button}
    >
      <b>A step-by-step path</b>
    </button>
    <button
      onClick={() => (window.location.href = 'howToContribute')}
      className={styles.button}
    >
      <b>Help by contributing 💛</b>
    </button>
  </div>
);
