import { RankingKey } from './types';

export const rankingKeyTranslation: Record<RankingKey, string> = {
  averageColdStartDuration: 'Average Cold Start Duration',
  maxColdStartDuration: 'Max Cold Start Duration',
  coldStartPercentage: 'Cold Start Percentage',
  memorySize: 'Memory Size',
  bundleSize: 'Bundle Size',
  timeout: 'Timeout',
  averageDuration: 'Average Duration',
  maxDuration: 'Max Duration',
  averageMemoryUsed: 'Average Memory Used',
  percentageMemoryUsed: 'Percentage Memory Used',
  itemCount: 'Item Count',
  tableSize: 'Table Size',
  averageItemSize: 'Average Item Size',
};

export const rankingUnitTranslation: Record<RankingKey, string> = {
  averageColdStartDuration: 'ms',
  maxColdStartDuration: 'ms',
  coldStartPercentage: '%',
  memorySize: 'MB',
  bundleSize: 'MB',
  timeout: 's',
  averageDuration: 'ms',
  maxDuration: 'ms',
  averageMemoryUsed: 'MB',
  percentageMemoryUsed: '%',
  itemCount: 'items',
  tableSize: 'MB',
  averageItemSize: 'kB',
};
