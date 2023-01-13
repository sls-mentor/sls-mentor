import { UilCopy, UilLightbulbAlt } from '@iconscout/react-unicons';

import React from 'react';
import styles from './codeBlock.module.css';

const copyCommand = (command: string) => {
  void navigator.clipboard.writeText(command);
};

interface CodeBlockProps {
  label: string;
  command: string;
  tip: string;
  commandSecondary: string;
}

export const CodeBlock = ({
  label,
  command,
  tip,
  commandSecondary,
}: CodeBlockProps): JSX.Element => (
  <div className={styles.outerBlock}>
    <h6>{label}</h6>
    <div className={styles.innerBlock}>
      <p className={styles.command}>
        {command}
        <span className={styles.secondary}>{commandSecondary}</span>
      </p>
      <UilCopy
        className={styles.copy}
        size="2em"
        onClick={() => copyCommand(command + commandSecondary)}
      />
    </div>
    <div className={styles.tip}>
      <UilLightbulbAlt className={styles.tipIcon} size="2em" />
      <p className="small">{tip}</p>
    </div>
  </div>
);
