import {
  ArnService,
  CustomARN,
  DynamoDBTableARN,
  getRefinedArn,
  LambdaFunctionARN,
} from '@sls-mentor/arn';
import { fetchAccountIdAndRegion, listAllResources } from '@sls-mentor/aws-api';

import { getEdges } from './edges';
import { getDynamoDBTableNodes, getLambdaFunctionNodes } from './nodes';
import { GraphData } from './types';

const servicesToHide: ArnService[] = ['backup', 'iam', 'logs'];

export const generateGraph = async ({
  tags,
  cloudformationStacks,
  region,
}: {
  tags?: { Key?: string; Value?: string }[];
  cloudformationStacks?: string[];
  region?: string;
}): Promise<GraphData> => {
  const { region: fetchedRegion, accountId } = await fetchAccountIdAndRegion();
  const regionToUse = region ?? fetchedRegion;
  CustomARN.setup({ accountId, region: regionToUse });

  const resources = await listAllResources({
    cloudformationStacksToFilter: cloudformationStacks,
    tagsToFilter: tags,
    region: regionToUse,
  });

  const [edges, lambdaFunctionNodes, dynamoDBTableNodes] = await Promise.all([
    getEdges(
      resources.map(({ arn }) => arn),
      servicesToHide,
    ),
    getLambdaFunctionNodes(resources),
    getDynamoDBTableNodes(resources),
  ]);

  const relevantArns = resources
    .map(({ arn }) => arn)
    .filter(arn => !servicesToHide.includes(arn.service));

  return {
    nodes: {
      ...relevantArns.reduce(
        (acc, arn) => {
          const refinedArn = getRefinedArn(arn);

          if (
            CustomARN.checkArnType(LambdaFunctionARN)(refinedArn) ||
            CustomARN.checkArnType(DynamoDBTableARN)(refinedArn)
          ) {
            return acc;
          }

          return {
            ...acc,
            [refinedArn.toString()]: {
              arn: refinedArn,
              stats: {},
              cloudformationStack: resources.find(resource =>
                resource.arn.is(arn),
              )?.cloudformationStack,
              tags:
                resources.find(resource => resource.arn.is(arn))?.tags ?? {},
            },
          };
        },
        {} as GraphData['nodes'],
      ),
      ...lambdaFunctionNodes,
      ...dynamoDBTableNodes,
    },
    edges,
  };
};
