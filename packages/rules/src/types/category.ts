export const CATEGORIES = [
  'GreenIT',
  'Stability',
  'Speed',
  'ITCosts',
  'Security',
] as const;
export type Category = typeof CATEGORIES[number];

export const categoryNames: Record<Category, string> = {
  GreenIT: 'Sustainability',
  Stability: 'Stability',
  Speed: 'Speed',
  ITCosts: 'Savings',
  Security: 'Security',
};
