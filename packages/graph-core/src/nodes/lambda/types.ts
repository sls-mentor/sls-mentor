export type ColdStartStats = {
  averageDuration: number;
  maxDuration: number;
  coldStartPercentage: number;
};

export type ConfigurationStats = {
  memorySize: number;
  timeout: number;
  bundleSize: number;
};

export type LambdaFunctionStats = {
  coldStarts?: ColdStartStats;
  configuration: ConfigurationStats;
};
