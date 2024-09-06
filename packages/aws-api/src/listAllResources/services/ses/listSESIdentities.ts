import { ListEmailIdentitiesCommand } from '@aws-sdk/client-sesv2';

import { SESIdentityARN } from '@sls-mentor/arn';

import { sesClient } from 'clients';

export const listSESIdentities = async (): Promise<SESIdentityARN[]> => {
  try {
    const command = new ListEmailIdentitiesCommand({});
    const { EmailIdentities } = await sesClient.send(command);

    return (
      EmailIdentities?.map(identity =>
        SESIdentityARN.fromIdentityName(identity.IdentityName ?? ''),
      ) ?? []
    );
  } catch (e) {
    console.log('There was an issue while getting SESIdentities: ', {
      e,
    });

    return [];
  }
};
