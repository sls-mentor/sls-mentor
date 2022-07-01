export type Tag = {
  key: string;
  value: string;
};

export type Options = {
  awsProfile?: string;
  awsRegion?: string;
  short: boolean;
  tags?: Tag[];
  cloudformation?: string;
  noFail: boolean;
};
