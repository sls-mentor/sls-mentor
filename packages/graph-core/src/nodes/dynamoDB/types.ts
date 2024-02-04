export type DynamoDBTableConfigurationStats = {
  averageItemSize: number;
  itemCount: number;
  tableSize: number;
};

export type DynamoDBTableStats = {
  configuration?: DynamoDBTableConfigurationStats;
};
