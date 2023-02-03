import { DBInstance, paginateDescribeDBInstances } from '@aws-sdk/client-rds';
import { rdsClient, RdsInstanceARN } from '@sls-mentor/core';

export const listRdsInstances = async (): Promise<RdsInstanceARN[]> => {
  const rdsInstances: DBInstance[] = [];

  for await (const resources of paginateDescribeDBInstances(
    { client: rdsClient },
    {},
  )) {
    rdsInstances.push(...(resources.DBInstances ?? []));
  }

  return rdsInstances
    .map(({ DBInstanceIdentifier }) => DBInstanceIdentifier)
    .filter(
      (DBInstanceIdentifier): DBInstanceIdentifier is string =>
        DBInstanceIdentifier !== undefined,
    )
    .map(RdsInstanceARN.fromRdsInstanceName);
};
