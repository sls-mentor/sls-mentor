import { analyzeGraph } from 'graph-cycles';

import { CloudformationStackARN } from '@sls-mentor/arn';
import { findStacksToStacksImports } from '@sls-mentor/aws-api';

import { CircularDependenciesWarnings, CloudFormationWarnings } from 'types';

type LinkBetweenStacks = {
  exportingStack?: CloudformationStackARN;
  importingStack?: CloudformationStackARN;
}[];

type Graph = {
  [key: string]: string[];
};

const detectCircularDependencies = (
  stacksImports: LinkBetweenStacks,
): string[][] => {
  const graph: Graph = stacksImports.reduce(
    (acc: Graph, { exportingStack, importingStack }) => {
      if (exportingStack !== undefined && importingStack !== undefined) {
        const exportingStackName = exportingStack.toString();
        const importingStackName = importingStack.toString();

        if (acc[exportingStackName] === undefined) {
          acc[exportingStackName] = [];
        }

        acc[exportingStackName]?.push(importingStackName);
      }

      return acc;
    },
    {},
  );

  const { cycles } = analyzeGraph(Object.entries(graph));

  return cycles;
};

type StacksToStacksImportsWithWarnings = {
  exportingStack?: CloudformationStackARN;
  importingStack?: CloudformationStackARN;
  warnings: CircularDependenciesWarnings[];
}[];

export const findStacksToStacksImportsWithCircularDependencies =
  async (): Promise<StacksToStacksImportsWithWarnings> => {
    const stacksToStacksImports = await findStacksToStacksImports();
    const circularDependencies = detectCircularDependencies(
      stacksToStacksImports,
    );

    const dictOfCircularDependencies: Record<string, boolean> = {};

    circularDependencies.forEach(cycle => {
      for (let i = 0; i < cycle.length; i++) {
        const from = cycle[i];
        const to = cycle[(i + 1) % cycle.length];

        if (from === undefined || to === undefined) {
          throw new Error('This should not happen');
        }

        dictOfCircularDependencies[`${from}-${to}`] = true;
        dictOfCircularDependencies[`${to}-${from}`] = true;
      }
    });

    return stacksToStacksImports.map(({ exportingStack, importingStack }) => {
      if (
        dictOfCircularDependencies[
          `${exportingStack?.toString() ?? ''}-${
            importingStack?.toString() ?? ''
          }`
        ] === true
      ) {
        return {
          exportingStack,
          importingStack,
          warnings: [CloudFormationWarnings.CircularDependencies],
        };
      }

      return {
        exportingStack,
        importingStack,
        warnings: [],
      };
    });
  };
