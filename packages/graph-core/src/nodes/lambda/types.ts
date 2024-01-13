export type ColdStartStats = {
  averageDuration: number;
  maxDuration: number;
  coldStartPercentage: number;
};

export type ExecutionStats = {
  averageDuration: number;
  maxDuration: number;
  averageMemoryUsed: number;
  percentageMemoryUsed: number;
};

export type ConfigurationStats = {
  memorySize: number;
  timeout: number;
  bundleSize: number;
};

export type LambdaFunctionStats = {
  coldStarts?: ColdStartStats;
  configuration: ConfigurationStats;
  execution?: ExecutionStats;
};
