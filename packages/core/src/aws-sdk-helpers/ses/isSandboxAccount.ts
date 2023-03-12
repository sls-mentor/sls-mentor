import { GetAccountCommand } from '@aws-sdk/client-sesv2';
import { sesClient } from '../../clients';

export const isSandboxAccount = async (): Promise<boolean> => {
  const command = new GetAccountCommand({});
  const response = await sesClient.send(command);

  return response.ProductionAccessEnabled === false;
};
