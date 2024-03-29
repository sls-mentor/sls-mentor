import { Dispatch, SetStateAction } from 'react';
import { GraphState, NODE_RADIUS } from './getInitialState';
import { rankingFunctions } from './ranking';
import { update } from './update';
import { OFFSET, updateWithRank } from './updateWithRank';
import { NodeVisibility, NodeWithLocationAndRank, RankingKey } from '../types';
import { computeClusters, getNodeCluster } from './computeClusters';
import { Edge } from '@sls-mentor/graph-core';

const computePartialVisibility = (
  nodes: Record<string, NodeWithLocationAndRank>,
  edges: Edge[],
): Record<string, NodeWithLocationAndRank> =>
  Object.fromEntries(
    Object.entries(nodes).map(([arn, node]) => {
      const isConnected = edges.some(
        ({ from, to }) =>
          (from === arn && nodes[to]?.visibility === NodeVisibility.Full) ||
          (to === arn && nodes[from]?.visibility === NodeVisibility.Full),
      );

      return [
        arn,
        {
          ...node,
          visibility:
            node.visibility === NodeVisibility.Full
              ? NodeVisibility.Full
              : isConnected
              ? NodeVisibility.Partial
              : NodeVisibility.None,
        },
      ];
    }),
  );

const getNodeTagVisibility = (
  node: NodeWithLocationAndRank,
  filterTagKey: string,
  filterTagValues: string[],
): NodeVisibility => {
  if (filterTagValues.length === 0) {
    return NodeVisibility.Full;
  }

  if (filterTagValues.some(value => node.tags[filterTagKey] === value)) {
    return NodeVisibility.Full;
  }

  return NodeVisibility.None;
};

const getNodeTagsVisibility = (
  node: NodeWithLocationAndRank,
  filterTags: Record<string, string[]>,
): NodeVisibility => {
  for (const [tagKey, tagValues] of Object.entries(filterTags)) {
    const tagVisibility = getNodeTagVisibility(node, tagKey, tagValues);

    if (tagVisibility === NodeVisibility.None) {
      return NodeVisibility.None;
    }
  }

  return NodeVisibility.Full;
};

const getNodeCfnVisibility = (
  node: NodeWithLocationAndRank,
  filterCloudformationStacks: string[],
): NodeVisibility => {
  if (filterCloudformationStacks.length === 0) {
    return NodeVisibility.Full;
  }

  if (filterCloudformationStacks.includes(node.cloudformationStack as string)) {
    return NodeVisibility.Full;
  }

  return NodeVisibility.None;
};

export const getNodeVisibility = (
  node: NodeWithLocationAndRank,
  filterCloudformationStacks: string[],
  filterTags: Record<string, string[]>,
): NodeVisibility => {
  const tagsVisibility = getNodeTagsVisibility(node, filterTags);
  const cfnVisibility = getNodeCfnVisibility(node, filterCloudformationStacks);

  if (
    tagsVisibility === NodeVisibility.None ||
    cfnVisibility === NodeVisibility.None
  ) {
    return NodeVisibility.None;
  }

  return NodeVisibility.Full;
};

export const setupRefresh = ({
  currentContainer,
  ranking,
  setState,
  enableCloudformationClustering,
  clusteringByTagValue,
  filterCloudformationStacks,
  filterTags,
}: {
  currentContainer: HTMLDivElement;
  ranking: RankingKey | undefined;
  setState: Dispatch<SetStateAction<GraphState>>;
  enableCloudformationClustering: boolean;
  filterCloudformationStacks: string[];
  clusteringByTagValue: string | undefined;
  filterTags: Record<string, string[]>;
}): {
  destroy: () => void;
} => {
  const { clientWidth, clientHeight } = currentContainer;

  const clusteringEnabled =
    enableCloudformationClustering || clusteringByTagValue !== undefined;

  const updateFn = ranking === undefined ? update : updateWithRank;

  if (ranking !== undefined) {
    const rankFn = rankingFunctions[ranking];
    if (rankFn === undefined) {
      throw new Error(`Ranking function for ${ranking} not found`);
    }

    setState(state => {
      const rankedNodes = Object.fromEntries(
        Object.values(state.nodes)
          .map(node => {
            const value = rankFn(node);
            return { arn: node.arn.toString(), value };
          })
          .filter(
            (node): node is { arn: string; value: number } =>
              node.value !== undefined,
          )
          .sort((a, b) => b.value - a.value)
          .map((node, index) => [node.arn, { rank: index, value: node.value }]),
      );

      const newNodes = Object.fromEntries(
        Object.entries(state.nodes).map(([arn, node]) => [
          arn,
          {
            ...node,
            rank: rankedNodes[arn]?.rank,
            value: rankedNodes[arn]?.value,
            visibility: getNodeVisibility(
              node,
              filterCloudformationStacks,
              filterTags,
            ),
            cluster: undefined,
          },
        ]),
      );

      return {
        ...state,
        nodes: computePartialVisibility(newNodes, state.edges),
        nodeRadius:
          (clientHeight - OFFSET) /
          Math.ceil(Math.sqrt(Object.values(rankedNodes).length)) /
          3,
        clusters: {},
      };
    });
  } else {
    setState(state => {
      const newNodes = Object.fromEntries(
        Object.entries(state.nodes).map(([arn, node]) => [
          arn,
          {
            ...node,
            visibility: getNodeVisibility(
              node,
              filterCloudformationStacks,
              filterTags,
            ),
            cluster: getNodeCluster({
              node,
              clusteringByTagValue,
              enableCloudformationClustering,
            }),
          },
        ]),
      );

      const clusters = computeClusters({
        clusteringByTagValue,
        enableCloudformationClustering,
        nodes: newNodes,
      });

      return {
        ...state,
        nodes: computePartialVisibility(newNodes, state.edges),
        nodeRadius: NODE_RADIUS,
        clusters,
      };
    });
  }

  const refresh = () => {
    setState(
      ({
        nodes,
        edges,
        mouseX,
        mouseY,
        nodeRadius,
        hoveredNode,
        hoveredNodeArn,
        zoomLevel,
        clickedNodeArn,
        clickedNode,
        clusters,
      }) => {
        updateFn({
          nodes,
          edges,
          clientWidth,
          clientHeight,
          clickedNodeArn,
          mouseX: mouseX - clientWidth / 2,
          mouseY: mouseY - clientHeight / 2,
          zoomLevel,
          clusteringEnabled,
          clusters,
        });

        const connectedArns: Record<string, boolean> = {};
        edges.forEach(edge => {
          if (edge.from === hoveredNodeArn) {
            connectedArns[edge.to] = true;
          }
          if (edge.to === hoveredNodeArn) {
            connectedArns[edge.from] = true;
          }
        });

        return {
          nodes,
          edges,
          hoveredNode,
          hoveredNodeArn,
          connectedArns,
          mouseX,
          mouseY,
          nodeRadius,
          zoomLevel,
          clickedNodeArn,
          clickedNode,
          clusters,
        };
      },
    );
  };

  const onMouseMove = (event: MouseEvent) => {
    setState(state => ({
      ...state,
      mouseX: event.clientX,
      mouseY: event.clientY,
    }));
  };

  const onKeyPress = (event: KeyboardEvent) => {
    if (event.code === 'Space') {
      setState(state => {
        const clickedNodeArn = state.clickedNodeArn;
        const clickedNode = state.nodes[clickedNodeArn ?? ''];
        if (clickedNode === undefined) {
          return state;
        }

        return {
          ...state,
          nodes: {
            ...state.nodes,
            [clickedNode.arn.toString()]: {
              ...clickedNode,
              pinned: !clickedNode.pinned,
            },
          },
        };
      });
    }
  };

  const interval = setInterval(refresh, 1000 / 30);
  currentContainer.addEventListener('mousemove', onMouseMove);
  document.addEventListener('keydown', onKeyPress);

  return {
    destroy: () => {
      clearInterval(interval);
      currentContainer.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('keydown', onKeyPress);
    },
  };
};
