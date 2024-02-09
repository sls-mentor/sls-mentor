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
import { MenuState, NodeWithLocationAndRank, RankingKey } from '../types';

export const useGraph = (
  data: GraphData,
): {
  containerRef: RefObject<HTMLDivElement>;
  clientWidth: number;
  clientHeight: number;
  ranking: RankingKey | undefined;
  setMenu: Dispatch<SetStateAction<MenuState>>;
  updateZoomLevel: (zoomFactor: number) => void;
  updateHoveredNode: (node: NodeWithLocationAndRank | undefined) => void;
  updateClickedNode: (node: NodeWithLocationAndRank | undefined) => void;
} & GraphState &
  MenuState => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState(getInitialState(data));
  const [menu, setMenu] = useState<MenuState>({
    ranking: undefined,
    warningsEnabled: false,
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
    ...menu,
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
      setState(state => ({
        ...state,
        clickedNode: node,
        clickedNodeArn: node === undefined ? undefined : node.arn.toString(),
      }));
    },
    ...state,
  };
};