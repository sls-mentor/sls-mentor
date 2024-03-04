import { paginateListSecrets } from '@aws-sdk/client-secrets-manager';

import { SecretsManagerSecretARN } from '@sls-mentor/arn';

import { secretsManagerClient } from 'clients';

export const listSecrets = async (): Promise<SecretsManagerSecretARN[]> => {
  const secrets = [];

  for await (const page of paginateListSecrets(
    { client: secretsManagerClient },
    {},
  )) {
    secrets.push(...(page.SecretList ?? []));
  }

  return secrets
    .map(({ ARN }) => ARN)
    .filter((arn): arn is string => arn !== undefined)
    .map(SecretsManagerSecretARN.fromSecretArn);
};
