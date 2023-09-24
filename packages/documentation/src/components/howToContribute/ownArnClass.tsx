import React from 'react';

import { Block } from './block';

export const OwnArnClassBlock = (): JSX.Element => (
  <>
    <h4>If your rule needs resources from a service that is not supported:</h4>
    <Block title="Create your own ARN class">
      <ol>
        <li>
          Create a new ARN class extending CustomARN (copy{' '}
          <a href="https://github.com/sls-mentor/sls-mentor/blob/main/packages/core/src/types/arn/lambda/LambdaFunctionARN.ts">
            LambdaFunctionARN
          </a>{' '}
          for example)
        </li>
        <li>
          Adapt the logic of this class to be able to be generated from a
          CloudFormation resourceId, and from any information returned by the
          AWS SDK (example: fromFunctionName for Lambdas)
        </li>
        <li>
          Add a case to the big switch case in{' '}
          <a href="https://github.com/sls-mentor/sls-mentor/blob/main/packages/cli/src/init/fetchCloudFormationResourceArns.ts">
            fetchCloudFormationResourceArns.
          </a>{' '}
          This will allow sls-mentor to turn resources from CloudFormation into
          your new ARN class.
        </li>
        <li>
          Add a client for your resource in{' '}
          <a href="https://github.com/sls-mentor/sls-mentor/blob/050705ca185efabcf504fb7534d14a320d653a80/packages/core/src/clients">
            clients
          </a>{' '}
          folder. This way we only use one client to send the requests to AWS.
        </li>
        <li>
          Create a folder <i>yourResource</i> with a{' '}
          <i>list&lt;YourResource&gt;.ts</i> file in the{' '}
          <a href="https://github.com/sls-mentor/sls-mentor/tree/main/packages/cli/src/init/listResources">
            listResources
          </a>{' '}
          folder
        </li>
        <li>
          In this file, use the AWS SDK to list all the needed resources from
          the user's account (don't forget pagination), and then use your new
          ARN class methods to turn the sdk data into your new ARN class
        </li>
        <li>
          Invoke this function in the{' '}
          <a href="https://github.com/sls-mentor/sls-mentor/blob/main/packages/cli/src/init/listResources/listAllResources.ts">
            listAllResources
          </a>
        </li>
      </ol>
    </Block>
  </>
);
