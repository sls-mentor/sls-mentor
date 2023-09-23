import { DBInstance, paginateDescribeDBInstances } from '@aws-sdk/client-rds';

import { RdsInstanceARN } from '@sls-mentor/arn';

import { rdsClient } from 'clients';

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
