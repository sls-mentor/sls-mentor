import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import styles from './title.module.css';

const letters = [
  { letter: 'S', color: 'red' },
  { letter: 'L', color: 'orange' },
  { letter: 'S', color: 'green' },
  { letter: 'M', color: 'red' },
  { letter: 'E', color: 'green' },
  { letter: 'N', color: 'orange' },
  { letter: 'T', color: 'red' },
  { letter: 'O', color: 'green' },
  { letter: 'R', color: 'green' },
];

export const Title = (): JSX.Element => {
  const [lettersOn, setLettersOn] = useState(letters.map(() => false));
  const [seconds, setSeconds] = useState(lettersOn.length * 2);

  const onTitleHover = () => {
    if (seconds === lettersOn.length * 2) {
      for (let i = 0; i < lettersOn.length * 2; i++) {
        setTimeout(() => setSeconds(i + 1), i * 500);
      }
    }
  };

  useEffect(() => {
    setLettersOn(
      letters.map((_, i) => seconds > i && seconds <= letters.length + i),
    );
  }, [seconds, setLettersOn]);

  return (
    <div className={styles['title-container']} onMouseOver={onTitleHover}>
      {letters.map(({ letter, color }, i) => (
        <div
          className={clsx(
            styles['letter-container'],
            lettersOn[i] && styles['on'],
          )}
          key={i}
        >
          <div
            className={clsx(styles.letter, styles[color])}
            style={i === 3 ? { marginLeft: '1em' } : {}}
          >
            <h3>{letter}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
