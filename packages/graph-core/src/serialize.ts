import { CustomARN, getRefinedArn } from '@sls-mentor/arn';

import { GraphData, SerializedGraphData } from 'types';

/**
 * Serializes graph data to write it inside a HTML report
 * @param graphData
 * @returns serialized graph data
 */
export const serializeGraphData = (
  graphData: GraphData,
): SerializedGraphData => {
  const { nodes, edges } = graphData;

  const serializedNodes = Object.entries(nodes).reduce(
    (acc, [arn, node]) => ({
      ...acc,
      [arn]: {
        arn: node.arn.toString(),
        stats: node.stats,
        cloudformationStack: node.cloudformationStack,
        tags: node.tags,
        vpcConfig: node.vpcConfig,
      },
    }),
    {} as SerializedGraphData['nodes'],
  );

  return {
    nodes: serializedNodes,
    edges,
    tags: graphData.tags,
    cloudformationStacks: graphData.cloudformationStacks,
    vpcConfig: graphData.vpcConfig,
  };
};

/**
 * Deserializes graph data from a HTML report
 * @param serializedGraphData
 * @returns deserialized graph data
 */
export const deserializeGraphData = (
  serializedGraphData: SerializedGraphData,
): GraphData => {
  const { nodes, edges } = serializedGraphData;

  const deserializedNodes = Object.entries(nodes).reduce(
    (acc, [arn, node]) => {
      const parsedCustomArn = CustomARN.fromArnString(arn);

      if (parsedCustomArn === undefined) {
        return acc;
      }

      const refinedArn = getRefinedArn(parsedCustomArn);

      return {
        ...acc,
        [arn]: {
          arn: refinedArn,
          stats: node.stats,
          cloudformationStack: node.cloudformationStack,
          tags: node.tags,
          vpcConfig: node.vpcConfig,
        },
        // Bold type casting - We trust the serialized data
        // And we know that LambdaFunctionArn -> string -> LambdaFunctionArn for example
      } as GraphData['nodes'];
    },
    {} as GraphData['nodes'],
  );

  return {
    nodes: deserializedNodes,
    edges,
    tags: serializedGraphData.tags,
    cloudformationStacks: serializedGraphData.cloudformationStacks,
    vpcConfig: serializedGraphData.vpcConfig,
  };
};
