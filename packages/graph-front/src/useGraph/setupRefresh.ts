import { CloudformationStackARN } from '@sls-mentor/arn';
import { Edge } from '@sls-mentor/graph-core';
import { Dispatch, SetStateAction } from 'react';
import { NodeVisibility, NodeWithLocation } from '../types';
import { computeClusters, getNodeCluster } from './computeClusters';
import { GraphState, NODE_RADIUS } from './getInitialState';
import { update } from './update';
import { updateVpc } from './updateVpc';

const computePartialVisibility = (
  nodes: Record<string, NodeWithLocation>,
  edges: Edge[],
): Record<string, NodeWithLocation> =>
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
  node: NodeWithLocation,
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
  node: NodeWithLocation,
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
  node: NodeWithLocation,
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
  node: NodeWithLocation,
  filterCloudformationStacks: string[],
  filterTags: Record<string, string[]>,
  seeCloudformationStacks: boolean,
): NodeVisibility => {
  if (!seeCloudformationStacks && CloudformationStackARN.is(node.arn)) {
    return NodeVisibility.None;
  }

  if (seeCloudformationStacks && !CloudformationStackARN.is(node.arn)) {
    return NodeVisibility.None;
  }

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
  setState,
  enableCloudformationClustering,
  enableVpcClustering,
  clusteringByTagValue,
  filterCloudformationStacks,
  filterTags,
  seeCloudformationStacks,
}: {
  currentContainer: HTMLDivElement;
  setState: Dispatch<SetStateAction<GraphState>>;
  enableCloudformationClustering: boolean;
  enableVpcClustering: boolean;
  filterCloudformationStacks: string[];
  clusteringByTagValue: string | undefined;
  filterTags: Record<string, string[]>;
  seeCloudformationStacks: boolean;
}): {
  destroy: () => void;
} => {
  const { clientWidth, clientHeight } = currentContainer;

  const clusteringEnabled =
    enableCloudformationClustering ||
    clusteringByTagValue !== undefined ||
    enableVpcClustering;

  const updateFn = enableVpcClustering ? updateVpc : update;

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
            seeCloudformationStacks,
          ),
          cluster: getNodeCluster({
            node,
            clusteringByTagValue,
            enableCloudformationClustering,
            enableVpcClustering,
          }),
        },
      ]),
    );

    const clusters = computeClusters({
      clusteringByTagValue,
      enableCloudformationClustering,
      nodes: newNodes,
      enableVpcClustering,
    });

    return {
      ...state,
      nodes: computePartialVisibility(newNodes, state.edges),
      nodeRadius: seeCloudformationStacks ? NODE_RADIUS * 2 : NODE_RADIUS,
      clusters,
    };
  });

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
          clickedNodeArn,
          mouseX: mouseX - clientWidth / 2,
          mouseY: mouseY - clientHeight / 2,
          zoomLevel,
          clusteringEnabled,
          clusters,
          ...(seeCloudformationStacks ? { repulsionConstant: 100 } : {}),
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
