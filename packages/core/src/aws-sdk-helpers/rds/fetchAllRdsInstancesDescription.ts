import {
  DBInstance,
  DescribeDBInstancesCommand,
  RDSServiceException,
} from '@aws-sdk/client-rds';
import { rdsClient } from 'clients';
import { CustomARN, RdsInstanceARN } from 'types';
const fetchRdsInstanceDescriptionByArn = async (
  arn: RdsInstanceARN,
): Promise<DBInstance | undefined> => {
  try {
    const { DBInstances: rdsInstancesDescriptionList } = await rdsClient.send(
      new DescribeDBInstancesCommand({
        DBInstanceIdentifier: arn.getRdsName(),
      }),
    );
    if (rdsInstancesDescriptionList === undefined) return undefined;

    return rdsInstancesDescriptionList[0];
  } catch (e) {
    if (e instanceof RDSServiceException && e.name === 'PermanentRedirect') {
      return undefined;
    }
    throw e;
  }
};

export const fetchAllRdsInstancesDescriptions = async (
  resources: CustomARN[],
): Promise<
  {
    arn: RdsInstanceARN;
    description: DBInstance | undefined;
  }[]
> => {
  const rdsInstances = CustomARN.filterArns(resources, RdsInstanceARN);

  const result = Promise.all(
    rdsInstances.map(async arn => ({
      arn,
      description: await fetchRdsInstanceDescriptionByArn(arn),
    })),
  );

  return result;
};
