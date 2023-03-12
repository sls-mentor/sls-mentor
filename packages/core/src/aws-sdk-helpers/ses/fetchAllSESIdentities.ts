import type { GetEmailIdentityCommandOutput } from '@aws-sdk/client-sesv2';
import { GetEmailIdentityCommand } from '@aws-sdk/client-sesv2';
import { sesClient } from '../../clients';
import { CustomARN, SESIdentityARN } from '../../types';

export const fetchAllSESIdentities = async (
  resources: CustomARN[],
): Promise<
  { arn: SESIdentityARN; identity: GetEmailIdentityCommandOutput }[]
> => {
  const sesArns = CustomARN.filterArns(resources, SESIdentityARN);
  const commands = sesArns.map(
    sesArn =>
      new GetEmailIdentityCommand({
        EmailIdentity: sesArn.getIdentity(),
      }),
  );
  const responses = Promise.all(
    commands.map(async (command, index) => ({
      arn: sesArns[index],
      identity: await sesClient.send(command),
    })),
  );

  return responses;
};
