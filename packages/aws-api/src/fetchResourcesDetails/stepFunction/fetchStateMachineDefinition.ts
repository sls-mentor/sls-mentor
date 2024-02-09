import { DescribeStateMachineCommand } from '@aws-sdk/client-sfn';

import { CustomARN, StepFunctionStateMachineARN } from '@sls-mentor/arn';

import { stepFunctionClient } from 'clients';

const fetchStateMachineDefinition = async (
  arn: StepFunctionStateMachineARN,
): Promise<{
  arn: StepFunctionStateMachineARN;
  definition: string;
}> => {
  const stateMachine = await stepFunctionClient.send(
    new DescribeStateMachineCommand({
      stateMachineArn: arn.toString(),
    }),
  );

  if (stateMachine.definition === undefined) {
    throw new Error('No definition found for state machine');
  }

  return {
    arn,
    definition: stateMachine.definition,
  };
};

export const fetchAllStepFunctionConfigurations = async (
  resources: CustomARN[],
): Promise<
  {
    arn: StepFunctionStateMachineARN;
    definition: string;
  }[]
> => {
  const stepFunctions = CustomARN.filterArns(
    resources,
    StepFunctionStateMachineARN,
  );

  return await Promise.all(
    stepFunctions.map(arn => fetchStateMachineDefinition(arn)),
  );
};
