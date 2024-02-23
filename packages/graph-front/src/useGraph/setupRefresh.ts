import { Dispatch, SetStateAction } from 'react';
import { GraphState, NODE_RADIUS } from './getInitialState';
import { rankingFunctions } from './ranking';
import { update } from './update';
import { OFFSET, updateWithRank } from './updateWithRank';
import { NodeVisibility, NodeWithLocationAndRank, RankingKey } from '../types';
import { Edge } from '@sls-mentor/graph-core';

const getNodeVisibility = (
  node: NodeWithLocationAndRank,
  filterCloudformationStacks: string[],
  edges: Edge[],
  nodes: Record<string, NodeWithLocationAndRank>,
): NodeVisibility => {
  if (filterCloudformationStacks.length === 0) {
    return NodeVisibility.Full;
  }

  if (filterCloudformationStacks.includes(node.cloudformationStack as string)) {
    return NodeVisibility.Full;
  }

  for (const { from, to } of edges) {
    if (
      from === node.arn.toString() &&
      filterCloudformationStacks.includes(
        nodes[to]?.cloudformationStack as string,
      )
    ) {
      return NodeVisibility.Partial;
    }

    if (
      to === node.arn.toString() &&
      filterCloudformationStacks.includes(
        nodes[from]?.cloudformationStack as string,
      )
    ) {
      return NodeVisibility.Partial;
    }
  }

  return NodeVisibility.None;
};

export const setupRefresh = ({
  currentContainer,
  ranking,
  setState,
  enableCloudformationClustering,
  filterCloudformationStacks,
}: {
  currentContainer: HTMLDivElement;
  ranking: RankingKey | undefined;
  setState: Dispatch<SetStateAction<GraphState>>;
  enableCloudformationClustering: boolean;
  filterCloudformationStacks: string[];
}): {
  destroy: () => void;
} => {
  const { clientWidth, clientHeight } = currentContainer;

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

      return {
        ...state,
        nodes: Object.fromEntries(
          Object.entries(state.nodes).map(([arn, node]) => [
            arn,
            {
              ...node,
              rank: rankedNodes[arn]?.rank,
              value: rankedNodes[arn]?.value,
              visibility: getNodeVisibility(
                node,
                filterCloudformationStacks,
                state.edges,
                state.nodes,
              ),
            },
          ]),
        ),
        nodeRadius:
          (clientHeight - OFFSET) /
          Math.ceil(Math.sqrt(Object.values(rankedNodes).length)) /
          3,
      };
    });
  } else {
    setState(state => ({
      ...state,
      nodes: Object.fromEntries(
        Object.entries(state.nodes).map(([arn, node]) => [
          arn,
          {
            ...node,
            visibility: getNodeVisibility(
              node,
              filterCloudformationStacks,
              state.edges,
              state.nodes,
            ),
          },
        ]),
      ),
      nodeRadius: NODE_RADIUS,
    }));
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
          clusteringEnabled: enableCloudformationClustering,
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
