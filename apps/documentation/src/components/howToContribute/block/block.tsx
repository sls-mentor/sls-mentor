import React from 'react';
import styles from './block.module.css';

interface BlockProps {
  title: string;
  children?: JSX.Element;
}

export const Block = ({ title, children }: BlockProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <h6>{title}</h6>
      <div className={styles.innerContainer}>
        <div className={styles.innerCard}>{children}</div>
      </div>
    </div>
  );
};
