import { ListEmailIdentitiesCommand } from '@aws-sdk/client-sesv2';
import { sesClient, SESIdentityARN } from '@sls-mentor/core';

export const listSESIdentities = async (): Promise<SESIdentityARN[]> => {
  const command = new ListEmailIdentitiesCommand({});
  const { EmailIdentities } = await sesClient.send(command);

  return (
    EmailIdentities?.map(identity =>
      SESIdentityARN.fromIdentityName(identity.IdentityName ?? ''),
    ) ?? []
  );
};
