export const Stage = { dev: 'DEV', prod: 'PROD' } as const;
export type Stage = (typeof Stage)[keyof typeof Stage];
