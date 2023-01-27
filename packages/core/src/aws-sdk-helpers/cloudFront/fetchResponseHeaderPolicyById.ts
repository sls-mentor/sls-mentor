import {
  GetResponseHeadersPolicyCommand,
  ResponseHeadersPolicy,
} from '@aws-sdk/client-cloudfront';
import { cloudFrontClient } from '../../clients';

const fetchResponseHeaderPolicyById = async (
  id: string | undefined,
): Promise<ResponseHeadersPolicy | undefined> => {
  const command = new GetResponseHeadersPolicyCommand({ Id: id });

  const commandOutput = await cloudFrontClient.send(command);

  const policy = commandOutput.ResponseHeadersPolicy;

  return policy;
};

export default fetchResponseHeaderPolicyById;
