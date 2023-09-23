import type { GetEmailIdentityCommandOutput } from '@aws-sdk/client-sesv2';
import { GetEmailIdentityCommand } from '@aws-sdk/client-sesv2';

import { CustomARN, SESIdentityARN } from '@sls-mentor/arn';

import { sesClient } from 'clients';

export const fetchAllSESIdentities = async (
  resources: CustomARN[],
): Promise<
  { arn: SESIdentityARN; identity: GetEmailIdentityCommandOutput }[]
> => {
  const sesArns = CustomARN.filterArns(resources, SESIdentityARN);

  return Promise.all(
    sesArns.map(async arn => ({
      arn,
      identity: await sesClient.send(
        new GetEmailIdentityCommand({
          EmailIdentity: arn.getIdentity(),
        }),
      ),
    })),
  );
};
