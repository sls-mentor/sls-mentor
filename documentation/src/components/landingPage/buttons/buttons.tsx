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
    <button className={styles.button}>
      <b>A step-by-step path</b>
    </button>
    <button className={styles.button}>
      <b>What do we assess ?</b>
    </button>
  </div>
);
