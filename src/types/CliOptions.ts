export type Tag = {
  key: string;
  value: string;
};

export type Options = {
  awsProfile?: string;
  awsRegion?: string;
  short: boolean;
  tags?: Tag[];
  /** @deprecated use cloudformationStacks instead */
  cloudformations?: string[];
  cloudformationStacks?: string[];
  noFail: boolean;
  getJsonResults?: boolean;
  level?: string;
};
