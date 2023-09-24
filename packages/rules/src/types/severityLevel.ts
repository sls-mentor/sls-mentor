export const SEVERITY_LEVELS = ['critical', 'high', 'medium', 'low'] as const;
export type Severity = typeof SEVERITY_LEVELS[number];
