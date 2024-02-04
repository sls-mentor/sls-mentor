import { useRef, useState, useEffect } from 'react';
import { GraphState, getInitialState } from './getInitialState';
import { setupRefresh } from './setupRefresh';
import { GraphData } from '@sls-mentor/graph-core';
import { NodeWithLocationAndRank, RankingKey } from '../types';

export const useGraph = (
  data: GraphData,
): {
  containerRef: React.RefObject<HTMLDivElement>;
  clientWidth: number;
  clientHeight: number;
  ranking: RankingKey | undefined;
  setRanking: (ranking: RankingKey | undefined) => void;
  updateZoomLevel: (zoomFactor: number) => void;
  updateHoveredNode: (node: NodeWithLocationAndRank | undefined) => void;
} & GraphState => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [state, setState] = useState(getInitialState(data));
  const [ranking, setRanking] = useState<RankingKey | undefined>(undefined);

  useEffect(() => {
    const { current: currentContainer } = containerRef;
    if (currentContainer === null) {
      return;
    }

    const { destroy } = setupRefresh({
      currentContainer,
      setState,
      ranking,
    });

    return destroy;
  }, [setState, ranking]);

  const { clientWidth, clientHeight } = containerRef.current ?? {
    clientWidth: 0,
    clientHeight: 0,
  };

  return {
    containerRef,
    clientWidth,
    clientHeight,
    ranking,
    setRanking,
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
    ...state,
  };
};
