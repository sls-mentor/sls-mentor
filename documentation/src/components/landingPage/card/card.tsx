import React from 'react';
import styles from './card.module.css';

interface CardProps {
  title: string;
  message: string;
}

export const Card = ({ title, message }: CardProps): JSX.Element => (
  <div className={styles.card}>
    <h6>{title}</h6>
    <p>{message}</p>
  </div>
);
