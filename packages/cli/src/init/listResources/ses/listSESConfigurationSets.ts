import { sesClient, SESConfigurationSetARN } from '@sls-mentor/core';

import { ListConfigurationSetsCommand } from '@aws-sdk/client-sesv2';

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
