export type MenuState = {
  warningsEnabled: boolean;
  enableCloudformationClustering: boolean;
  enableVpcClustering: boolean;
  clusteringByTagValue: string | undefined;
  filterCloudformationStacks: string[];
  filterTags: Record<string, string[]>;
  seeCloudformationStacks: boolean;
  openStats: boolean;
  filterByName: string;
};
