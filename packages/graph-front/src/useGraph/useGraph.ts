import { useState, useEffect, useRef } from 'react';
import { GraphState, getInitialState } from './getInitialState';
import { setupRefresh } from './setupRefresh';
import { GraphData } from '@sls-mentor/graph-core';
import { MenuState, NodeWithLocation } from '../types';

export const useGraph = (
  data: GraphData,
  menu: MenuState,
): {
  clientWidth: number;
  clientHeight: number;
  updateZoomLevel: (zoomFactor: number) => void;
  updateHoveredNode: (node: NodeWithLocation | undefined) => void;
  updateClickedNode: (node: NodeWithLocation | undefined) => void;
  containerRef: React.RefObject<HTMLDivElement>;
} & GraphState => {
  const [state, setState] = useState(getInitialState(data));
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current === null) {
      return;
    }

    const { destroy } = setupRefresh({
      currentContainer: containerRef.current,
      setState,
      enableCloudformationClustering: menu.enableCloudformationClustering,
      enableVpcClustering: menu.enableVpcClustering,
      filterCloudformationStacks: menu.filterCloudformationStacks,
      clusteringByTagValue: menu.clusteringByTagValue,
      filterTags: menu.filterTags,
      filterByName: menu.filterByName,
      seeCloudformationStacks: menu.seeCloudformationStacks,
    });

    return destroy;
  }, [setState, menu]);

  const { clientWidth, clientHeight } = containerRef.current ?? {
    clientWidth: 0,
    clientHeight: 0,
  };

  return {
    clientWidth,
    clientHeight,
    updateZoomLevel: zoomFactor => {
      setState(state => ({
        ...state,
        zoomLevel: state.zoomLevel * zoomFactor,
      }));
    },
    updateHoveredNode: node => {
      setState(state => ({
        ...state,
        hoveredNode: node,
        hoveredNodeArn: node === undefined ? undefined : node.arn.toString(),
      }));
    },
    updateClickedNode: node => {
      setState(state => {
        const nodesWithoutPinnedNode =
          node === undefined
            ? {}
            : {
                nodes: {
                  ...state.nodes,
                  [node.arn.toString()]: {
                    ...node,
                    pinned: false,
                  },
                },
              };

        return {
          ...state,
          clickedNode: node,
          clickedNodeArn: node === undefined ? undefined : node.arn.toString(),
          ...nodesWithoutPinnedNode,
        };
      });
    },
    ...state,
    containerRef,
  };
};
