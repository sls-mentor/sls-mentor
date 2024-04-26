import {
  DBCluster,
  DBSubnetGroup,
  DescribeDBClustersCommand,
  DescribeDBSubnetGroupsCommand,
  RDSServiceException,
} from '@aws-sdk/client-rds';

import { CustomARN, RdsClusterARN } from '@sls-mentor/arn';

import { rdsClient } from 'clients';

const fetchRdsClusterByArn = async (
  arn: RdsClusterARN,
): Promise<DBCluster | undefined> => {
  try {
    const { DBClusters: rdsClustersList } = await rdsClient.send(
      new DescribeDBClustersCommand({
        DBClusterIdentifier: arn.getClusterIdentifier(),
      }),
    );
    if (rdsClustersList === undefined) {
      return undefined;
    }

    return rdsClustersList[0];
  } catch (e) {
    if (e instanceof RDSServiceException && e.name === 'PermanentRedirect') {
      return undefined;
    }
    throw e;
  }
};

export const fetchAllRdsCluster = async (
  resources: CustomARN[],
): Promise<
  {
    arn: RdsClusterARN;
    configuration: DBCluster | undefined;
  }[]
> => {
  const rdsClusters = CustomARN.filterArns(resources, RdsClusterARN);

  const result = Promise.all(
    rdsClusters.map(async arn => ({
      arn,
      configuration: await fetchRdsClusterByArn(arn),
    })),
  );

  return result;
};

export const fetchRdsSubnetGroups = async (
  subnetGroupName: string,
): Promise<DBSubnetGroup[]> => {
  const { DBSubnetGroups: subnetGroupsList } = await rdsClient.send(
    new DescribeDBSubnetGroupsCommand({ DBSubnetGroupName: subnetGroupName }),
  );
  if (subnetGroupsList === undefined) {
    return [];
  }

  return subnetGroupsList;
};
