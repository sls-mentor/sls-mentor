import { GetCallerIdentityCommand, STSClient } from '@aws-sdk/client-sts';

export const initAccountAndRegion = async (): Promise<void> => {
  const stsClient = new STSClient({});

  const { Account } = await stsClient.send(new GetCallerIdentityCommand({}));
  if (Account === undefined) {
    throw new Error(
      'IAM user or role whose credentials are used to call the operations with the STS Client are undefined.',
    );
  }

  process.env.ACCOUNT_ID = Account;

  if (process.env.AWS_REGION === undefined) {
    process.env.AWS_REGION = await stsClient.config.region();
  }
};
