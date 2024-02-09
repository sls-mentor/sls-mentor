type Definition =
  | undefined
  | null
  | {
      Type?: string;
      Resource?: string;
      Parameters: { FunctionName: string };
    };

export const findLambdasInDefinition = (definition: string): string[] => {
  const parsedDefinition = JSON.parse(definition) as Definition;
  const lambdaArns: string[] = [];

  const iterator = (o: Definition) => {
    if (o === undefined || o === null || typeof o !== 'object') {
      return;
    }

    if (
      o['Type'] === 'Task' &&
      o['Resource'] === 'arn:aws:states:::lambda:invoke'
    ) {
      lambdaArns.push(o['Parameters']['FunctionName']);

      return;
    }

    Object.keys(o).forEach(key => {
      // @ts-expect-error we tried but it was difficult
      iterator(o[key] as unknown as Definition);
    });
  };

  iterator(parsedDefinition);

  return lambdaArns;
};
