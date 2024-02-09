import {
  paginateListStateMachines,
  StateMachineListItem,
} from '@aws-sdk/client-sfn';

import { StepFunctionStateMachineARN } from '@sls-mentor/arn';

import { stepFunctionClient } from 'clients';

export const listStateMachines = async (): Promise<
  StepFunctionStateMachineARN[]
> => {
  const stateMachines: StateMachineListItem[] = [];

  for await (const resources of paginateListStateMachines(
    { client: stepFunctionClient },
    {},
  )) {
    stateMachines.push(...(resources.stateMachines ?? []));
  }

  return stateMachines.map(({ name }) =>
    StepFunctionStateMachineARN.fromStateMachineName(name ?? ''),
  );
};
