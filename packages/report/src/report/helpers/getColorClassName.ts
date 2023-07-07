export const getColorClassName = (percentage: number): string => {
  if (percentage > 75) {
    return 'high';
  }

  if (percentage > 50) {
    return 'medium';
  }

  return 'low';
};
