import { useEffect, useState } from 'react';

export const useAnimatedAmount = (amount: number): number => {
  const [animatedAmount, setAnimatedAmount] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    if (isAnimated) {
      return;
    }

    setInterval(() => {
      setAnimatedAmount(value =>
        Math.min(value + amount / (4 * (value + 1)), amount),
      );
    }, 20);

    setIsAnimated(true);
  }, [amount, animatedAmount, isAnimated, setIsAnimated]);

  return animatedAmount;
};
