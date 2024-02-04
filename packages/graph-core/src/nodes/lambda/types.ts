export type LambdaFunctionColdStartStats = {
  averageDuration: number;
  maxDuration: number;
  coldStartPercentage: number;
};

export type LambdaFunctionExecutionStats = {
  averageDuration: number;
  maxDuration: number;
  averageMemoryUsed: number;
  percentageMemoryUsed: number;
};

export type LambdaFunctionConfigurationStats = {
  memorySize: number;
  timeout: number;
  bundleSize: number;
};

export type LambdaFunctionStats = {
  coldStarts?: LambdaFunctionColdStartStats;
  configuration: LambdaFunctionConfigurationStats;
  execution?: LambdaFunctionExecutionStats;
};
