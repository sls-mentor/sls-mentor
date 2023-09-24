import {
  GetResponseHeadersPolicyCommand,
  ResponseHeadersPolicy,
} from '@aws-sdk/client-cloudfront';

import { cloudFrontClient } from 'clients';

export const fetchResponseHeadersPolicyByResponseHeadersPolicyId = async (
  policyId: string | undefined,
): Promise<ResponseHeadersPolicy | undefined> => {
  if (policyId === undefined) {
    return undefined;
  }
  const command = new GetResponseHeadersPolicyCommand({ Id: policyId });

  const commandOutput = await cloudFrontClient.send(command);

  const policy = commandOutput.ResponseHeadersPolicy;

  return policy;
};
