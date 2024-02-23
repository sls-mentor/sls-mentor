export const RankingKey = {
  averageColdStartDuration: 'averageColdStartDuration',
  maxColdStartDuration: 'maxColdStartDuration',
  coldStartPercentage: 'coldStartPercentage',
  memorySize: 'memorySize',
  bundleSize: 'bundleSize',
  timeout: 'timeout',
  averageDuration: 'averageDuration',
  maxDuration: 'maxDuration',
  averageMemoryUsed: 'averageMemoryUsed',
  percentageMemoryUsed: 'percentageMemoryUsed',
  itemCount: 'itemCount',
  tableSize: 'tableSize',
  averageItemSize: 'averageItemSize',
} as const;
export type RankingKey = (typeof RankingKey)[keyof typeof RankingKey];

export type MenuState = {
  ranking: RankingKey | undefined;
  warningsEnabled: boolean;
  enableCloudformationClustering: boolean;
  filterCloudformationStacks: string[];
};
