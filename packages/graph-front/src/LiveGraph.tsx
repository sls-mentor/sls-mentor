import {
  DynamoDBTableNode,
  GraphData,
  LambdaFunctionNode,
  Node,
} from '@sls-mentor/graph-core';
import { useEffect, useRef, useState } from 'react';
import { update } from './update';
import { DynamoDBTableARN, LambdaFunctionARN } from '@sls-mentor/arn';
import { ArnAwsIcons } from './assets/iconComponents';

import { NODE_RADIUS, getInitialState } from './getInitialState';
import { NodeWithLocationAndRank } from './types';
import { OFFSET, updateWithRank } from './updateWithRank';

import { SlsMentorLogo } from './assets/iconComponents';
import { Logo } from './Logo';

const RankingKey = {
  averageColdStartDuration: 'averageColdStartDuration',
  maxColdStartDuration: 'maxColdStartDuration',
  coldStartPercentage: 'coldStartPercentage',
  memorySize: 'memorySize',
  bundleSize: 'bundleSize',
  timeout: 'timeout',
  averageDuration: 'averageDuration',
  maxDuration: 'maxDuration',
  averageMemoryUsed: 'averageMemoryUsed',
  percentageMemoryUsed: 'percentageMemoryUsed',
  itemCount: 'itemCount',
  tableSize: 'tableSize',
  averageItemSize: 'averageItemSize',
} as const;
type RankingKey = (typeof RankingKey)[keyof typeof RankingKey];

const rankingKeyTranslation: Record<RankingKey, string> = {
  averageColdStartDuration: 'Average Cold Start Duration',
  maxColdStartDuration: 'Max Cold Start Duration',
  coldStartPercentage: 'Cold Start Percentage',
  memorySize: 'Memory Size',
  bundleSize: 'Bundle Size',
  timeout: 'Timeout',
  averageDuration: 'Average Duration',
  maxDuration: 'Max Duration',
  averageMemoryUsed: 'Average Memory Used',
  percentageMemoryUsed: 'Percentage Memory Used',
  itemCount: 'Item Count',
  tableSize: 'Table Size',
  averageItemSize: 'Average Item Size',
};

const rankingUnit: Record<RankingKey, string> = {
  averageColdStartDuration: 'ms',
  maxColdStartDuration: 'ms',
  coldStartPercentage: '%',
  memorySize: 'MB',
  bundleSize: 'MB',
  timeout: 's',
  averageDuration: 'ms',
  maxDuration: 'ms',
  averageMemoryUsed: 'MB',
  percentageMemoryUsed: '%',
  itemCount: 'items',
  tableSize: 'MB',
  averageItemSize: 'kB',
};

const isLambdaNode = (node: Node): node is LambdaFunctionNode =>
  LambdaFunctionARN.is(node.arn);

const isDynamoDBTableNode = (node: Node): node is DynamoDBTableNode =>
  DynamoDBTableARN.is(node.arn);

const rankings: Record<
  RankingKey,
  (node: NodeWithLocationAndRank) => number | undefined
> = {
  averageColdStartDuration: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.coldStarts?.averageDuration;
  },
  maxColdStartDuration: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.coldStarts?.maxDuration;
  },
  coldStartPercentage: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.coldStarts?.coldStartPercentage;
  },
  memorySize: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.configuration.memorySize;
  },
  bundleSize: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.configuration.bundleSize / 1000;
  },
  timeout: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.configuration.timeout;
  },
  averageDuration: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.execution?.averageDuration;
  },
  maxDuration: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.execution?.maxDuration;
  },
  averageMemoryUsed: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    const averageMemoryUsed = node.stats.execution?.averageMemoryUsed;

    if (averageMemoryUsed === undefined) {
      return undefined;
    }

    return averageMemoryUsed / 1000000;
  },
  percentageMemoryUsed: node => {
    if (!isLambdaNode(node)) {
      return undefined;
    }

    return node.stats.execution?.percentageMemoryUsed;
  },
  tableSize: node => {
    if (!isDynamoDBTableNode(node)) {
      return undefined;
    }

    const tableSizeBytes = node.stats.configuration?.tableSize;

    if (tableSizeBytes === undefined) {
      return undefined;
    }

    return tableSizeBytes / 1000000;
  },
  itemCount: node => {
    if (!isDynamoDBTableNode(node)) {
      return undefined;
    }

    return node.stats.configuration?.itemCount;
  },
  averageItemSize: node => {
    if (!isDynamoDBTableNode(node)) {
      return undefined;
    }

    const averageItemSizeBytes = node.stats.configuration?.averageItemSize;

    if (averageItemSizeBytes === undefined) {
      return undefined;
    }

    return averageItemSizeBytes / 1000;
  },
};

export const LiveGraph = ({ data }: { data: GraphData }): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [
    {
      nodes,
      edges,
      hoveredNode,
      connectedArns,
      hoveredNodeArn,
      nodeRadius,
      zoomLevel,
    },
    setState,
  ] = useState(getInitialState(data));
  const [ranking, setRanking] = useState<RankingKey | undefined>(undefined);

  useEffect(() => {
    const { current: currentContainer } = containerRef;
    if (currentContainer === null) {
      return;
    }

    const { clientWidth, clientHeight } = currentContainer;

    const updateFn = ranking === undefined ? update : updateWithRank;

    if (ranking !== undefined) {
      const rankFn = rankings[ranking];
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
            .map((node, index) => [
              node.arn,
              { rank: index, value: node.value },
            ]),
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
        }) => {
          updateFn({
            nodes,
            edges,
            clientWidth,
            clientHeight,
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

    const interval = setInterval(refresh, 1000 / 30);
    currentContainer.addEventListener('mousemove', onMouseMove);

    return () => {
      clearInterval(interval);
      currentContainer.removeEventListener('mousemove', onMouseMove);
    };
  }, [setState, ranking]);

  const { clientWidth, clientHeight } = containerRef.current ?? {
    clientWidth: 0,
    clientHeight: 0,
  };

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#111',
      }}
      ref={containerRef}
    >
      {ranking === undefined &&
        edges.map(({ from, to }) => {
          const fromNode = nodes[from];
          const toNode = nodes[to];

          if (fromNode === undefined || toNode === undefined) {
            return null;
          }

          return (
            <div
              key={`${from}-${to}`}
              style={{
                position: 'absolute',
                backgroundColor: 'white',
                height: 2,
                width:
                  Math.sqrt(
                    (fromNode.x - toNode.x) ** 2 + (fromNode.y - toNode.y) ** 2,
                  ) * zoomLevel,
                left: zoomLevel * toNode.x + clientWidth / 2,
                top: zoomLevel * toNode.y + clientHeight / 2,
                rotate: `${Math.atan2(
                  fromNode.y - toNode.y,
                  fromNode.x - toNode.x,
                )}rad`,
                transformOrigin: 'top left',
                opacity:
                  hoveredNodeArn !== undefined &&
                  (hoveredNodeArn === from || hoveredNodeArn === to)
                    ? 0.5
                    : 0.1,
              }}
            />
          );
        })}
      {Object.entries(nodes).map(([arn, node]) =>
        ranking === undefined || node.rank !== undefined ? (
          <div
            key={arn}
            style={{
              position: 'absolute',
              left: zoomLevel * (node.x - nodeRadius) + clientWidth / 2,
              top: zoomLevel * (node.y - nodeRadius) + clientHeight / 2,
              opacity:
                hoveredNodeArn === arn ||
                connectedArns[arn] ||
                hoveredNode === undefined
                  ? 1
                  : 0.5,
            }}
          >
            <div
              style={{
                width: nodeRadius * 2 * zoomLevel,
                height: nodeRadius * 2 * zoomLevel,
                borderRadius: nodeRadius * zoomLevel,
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onMouseEnter={() =>
                setState(state => ({
                  ...state,
                  hoveredNode: node,
                  hoveredNodeArn: arn,
                }))
              }
              onMouseLeave={() =>
                setState(state => ({
                  ...state,
                  hoveredNode: undefined,
                  hoveredNodeArn: undefined,
                }))
              }
            >
              <div
                style={{
                  pointerEvents: 'none',
                  height: '100%',
                  width: '100%',
                  lineHeight: 0,
                }}
              >
                {ArnAwsIcons[node.arn.service]}
              </div>
            </div>
            {node.value !== undefined && ranking !== undefined && (
              <p
                style={{
                  position: 'absolute',
                  fontSize: (nodeRadius / 1.5) * zoomLevel,
                  backgroundColor: '#fffa',
                  borderRadius: 5 * zoomLevel,
                  transform: 'translate(-50%, 10%)',
                  left: nodeRadius * zoomLevel,
                  width: 'max-content',
                  padding: 1,
                }}
              >
                {node.value.toFixed(1)} {rankingUnit[ranking]}
              </p>
            )}
          </div>
        ) : null,
      )}
      {hoveredNode !== undefined &&
        (ranking === undefined || hoveredNode.rank !== undefined) && (
          <>
            <p
              style={{
                position: 'absolute',
                left: hoveredNode.x * zoomLevel + clientWidth / 2,
                top:
                  (hoveredNode.y + nodeRadius) * zoomLevel + clientHeight / 2,
                textAlign: 'center',
                overflow: 'visible',
                transform: 'translateX(-50%)',
                fontSize: 24,
                backgroundColor: '#fffa',
                borderRadius: 5,
                padding: 1,
              }}
            >
              {hoveredNodeArn}
            </p>
            {hoveredNode.value !== undefined && ranking !== undefined && (
              <p
                style={{
                  position: 'absolute',
                  left: hoveredNode.x * zoomLevel + clientWidth / 2,
                  top:
                    (hoveredNode.y + nodeRadius) * zoomLevel + clientHeight / 2,
                  fontSize: 32,
                  backgroundColor: '#fffa',
                  borderRadius: 5,
                  transform: 'translate(-50%, 150%)',
                  width: 'max-content',
                }}
              >
                {hoveredNode.value.toFixed(1)} {rankingUnit[ranking]}
              </p>
            )}
          </>
        )}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          padding: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {Object.values(RankingKey).map(key => (
          <button key={key} onClick={() => setRanking(key)}>
            {rankingKeyTranslation[key]}
          </button>
        ))}
        <button onClick={() => setRanking(undefined)}>None</button>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          position: 'absolute',
          padding: '16px',
          bottom: 0,
          left: 0,
        }}
      >
        <div style={{ width: '3em' }}>{SlsMentorLogo}</div>
        <p style={{ fontSize: '1.5em', color: 'white', fontWeight: 600 }}>
          sls-mentor
        </p>
      </div>
      {ranking !== undefined && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            position: 'absolute',
            padding: '16px',
            top: 0,
            left: 0,
          }}
        >
          <p style={{ fontSize: 18, color: 'white', fontWeight: 500 }}>
            Lambda functions ranked by {rankingKeyTranslation[ranking]} (
            {rankingUnit[ranking]})
          </p>
        </div>
      )}
      <Logo />
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
        }}
      >
        <button
          onClick={() => {
            setState(state => ({
              ...state,
              zoomLevel: state.zoomLevel * 1.1,
            }));
          }}
          style={{ width: '1.5em', height: '1.5em', fontSize: '1.5em' }}
        >
          +
        </button>
        <button
          onClick={() => {
            setState(state => ({
              ...state,
              zoomLevel: state.zoomLevel / 1.1,
            }));
          }}
          style={{ width: '1.5em', height: '1.5em', fontSize: '1.5em' }}
        >
          -
        </button>
      </div>
    </div>
  );
};
