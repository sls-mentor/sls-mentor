import {
  ArnService,
  CustomARN,
  getRefinedArn,
  LambdaFunctionARN,
} from '@sls-mentor/arn';
import { fetchAccountIdAndRegion, listAllResources } from '@sls-mentor/aws-api';

import { getEdges } from './edges';
import { getLambdaFunctionNodes } from './nodes';
import { GraphData } from './types';

const servicesToHide: ArnService[] = ['backup', 'iam', 'logs'];

export const generateGraph = async ({
  tags,
  cloudformationStacks,
  region,
}: {
  tags?: { key: string; value: string }[];
  cloudformationStacks?: string[];
  region?: string;
}): Promise<GraphData> => {
  const { region: fetchedRegion, accountId } = await fetchAccountIdAndRegion();
  const regionToUse = region ?? fetchedRegion;
  CustomARN.setup({ accountId, region: regionToUse });

  const arns = await listAllResources({
    cloudformationStacks,
    tags,
    region: regionToUse,
  });

  const [edges, lambdaFunctionNodes] = await Promise.all([
    getEdges(arns, servicesToHide),
    getLambdaFunctionNodes(arns),
  ]);

  const relevantArns = arns.filter(
    arn => !servicesToHide.includes(arn.service),
  );

  return {
    nodes: {
      ...relevantArns.reduce(
        (acc, arn) => {
          const refinedArn = getRefinedArn(arn);

          if (CustomARN.checkArnType(LambdaFunctionARN)(refinedArn)) {
            return acc;
          }

          return {
            ...acc,
            [refinedArn.toString()]: {
              arn: refinedArn,
              stats: {},
            },
          };
        },
        {} as GraphData['nodes'],
      ),
      ...lambdaFunctionNodes,
    },
    edges,
  };
};
