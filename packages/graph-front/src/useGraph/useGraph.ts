import {
  useRef,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  RefObject,
} from 'react';
import { GraphState, getInitialState } from './getInitialState';
import { setupRefresh } from './setupRefresh';
import { GraphData } from '@sls-mentor/graph-core';
import { MenuState, NodeWithLocationAndRank } from '../types';

export const useGraph = (
  data: GraphData,
): {
  containerRef: RefObject<HTMLDivElement>;
  clientWidth: number;
  clientHeight: number;
  setMenu: Dispatch<SetStateAction<MenuState>>;
  updateZoomLevel: (zoomFactor: number) => void;
  updateHoveredNode: (node: NodeWithLocationAndRank | undefined) => void;
  updateClickedNode: (node: NodeWithLocationAndRank | undefined) => void;
  menu: MenuState;
} & GraphState => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState(getInitialState(data));
  const [menu, setMenu] = useState<MenuState>({
    ranking: undefined,
    warningsEnabled: false,
    enableCloudformationClustering: false,
    filterCloudformationStacks: [],
    clusteringByTagValue: undefined,
    filterTags: {},
  });

  useEffect(() => {
    const { current: currentContainer } = containerRef;
    if (currentContainer === null) {
      return;
    }

    const { destroy } = setupRefresh({
      currentContainer,
      setState,
      ranking: menu.ranking,
      enableCloudformationClustering: menu.enableCloudformationClustering,
      filterCloudformationStacks: menu.filterCloudformationStacks,
      clusteringByTagValue: menu.clusteringByTagValue,
      filterTags: menu.filterTags,
    });

    return destroy;
  }, [setState, menu]);

  const { clientWidth, clientHeight } = containerRef.current ?? {
    clientWidth: 0,
    clientHeight: 0,
  };

  return {
    containerRef,
    clientWidth,
    clientHeight,
    setMenu,
    menu,
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

      setState(state => ({
        ...state,
        clickedNode: node,
        clickedNodeArn: node === undefined ? undefined : node.arn.toString(),
        ...nodesWithoutPinnedNode,
      }));
    },
    ...state,
  };
};
