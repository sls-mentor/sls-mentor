import { ListConfigurationSetsCommand } from '@aws-sdk/client-sesv2';

import { SESConfigurationSetARN } from '@sls-mentor/arn';

import { sesClient } from 'clients';

export const listSESConfigurationSets = async (): Promise<
  SESConfigurationSetARN[]
> => {
  const command = new ListConfigurationSetsCommand({});
  const { ConfigurationSets } = await sesClient.send(command);

  return (
    ConfigurationSets?.map(configurationSet =>
      SESConfigurationSetARN.fromConfigurationSetName(configurationSet),
    ) ?? []
  );
};
