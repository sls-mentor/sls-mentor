import { GetCallerIdentityCommand, STSClient } from '@aws-sdk/client-sts';

export const fetchAccountIdAndRegion = async (): Promise<{
  accountId: string;
  region: string;
}> => {
  const stsClient = new STSClient({});

  const { Account } = await stsClient.send(new GetCallerIdentityCommand({}));
  if (Account === undefined) {
    throw new Error(
      'IAM user or role whose credentials are used to call the operations with the STS Client are undefined.',
    );
  }

  return {
    accountId: Account,
    region: await stsClient.config.region(),
  };
};
