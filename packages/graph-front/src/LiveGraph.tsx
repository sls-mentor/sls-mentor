import { Data } from '@sls-mentor/graph-core';
import { useEffect, useRef, useState } from 'react';
import { update } from './update';
import { ArnService } from '@sls-mentor/arn';
import { ArnAwsIcons } from './assets/iconComponents';

import { getInitialState } from './getInitialState';

const NODE_RADIUS = 15;

export const LiveGraph = ({ data }: { data: Data }): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [{ nodes, edges, hoveredNode, connectedArns }, setState] = useState(
    getInitialState(data),
  );

  useEffect(() => {
    const { current: currentContainer } = containerRef;
    if (currentContainer === null) {
      return;
    }

    const { clientWidth, clientHeight } = currentContainer;

    const refresh = () => {
      setState(({ nodes, edges, mouseX, mouseY }) => {
        update({
          nodes,
          edges,
        });

        const hoveredNode = Object.values(nodes).find(
          node =>
            (node.x + clientWidth / 2 - mouseX) ** 2 +
              (node.y + clientHeight / 2 - mouseY) ** 2 <
            NODE_RADIUS ** 2,
        );

        const connectedArns: Record<string, boolean> = {};
        edges.forEach(edge => {
          if (edge.from === hoveredNode?.arn) {
            connectedArns[edge.to] = true;
          }
          if (edge.to === hoveredNode?.arn) {
            connectedArns[edge.from] = true;
          }
        });

        return {
          nodes,
          edges,
          hoveredNode,
          connectedArns,
          mouseX,
          mouseY,
        };
      });
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
  }, [setState]);

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
      {edges.map(({ from, to }) => {
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
              width: Math.sqrt(
                (fromNode.x - toNode.x) ** 2 + (fromNode.y - toNode.y) ** 2,
              ),
              left: toNode.x + clientWidth / 2,
              top: toNode.y + clientHeight / 2,
              rotate: `${Math.atan2(
                fromNode.y - toNode.y,
                fromNode.x - toNode.x,
              )}rad`,
              transformOrigin: 'top left',
              opacity:
                hoveredNode?.arn === from || hoveredNode?.arn === to
                  ? 0.5
                  : 0.1,
            }}
          />
        );
      })}
      {Object.entries(nodes).map(([arn, node]) => (
        <div
          key={arn}
          style={{
            position: 'absolute',
            left: node.x + clientWidth / 2 - NODE_RADIUS,
            top: node.y + clientHeight / 2 - NODE_RADIUS,
            width: NODE_RADIUS * 2,
            height: NODE_RADIUS * 2,
            borderRadius: NODE_RADIUS,
            overflow: 'hidden',
            opacity: hoveredNode?.arn === arn || connectedArns[arn] ? 1 : 0.5,
            cursor: 'pointer',
          }}
        >
          <div style={{ pointerEvents: 'none' }}>
            {ArnAwsIcons[node.parsedArn.service as ArnService]}
          </div>
        </div>
      ))}
      {hoveredNode !== undefined && (
        <p
          style={{
            position: 'absolute',
            left: hoveredNode.x + clientWidth / 2 - NODE_RADIUS,
            top: hoveredNode.y + clientHeight / 2 + NODE_RADIUS,
            textAlign: 'center',
            fontSize: 24,
            overflow: 'visible',
            transform: 'translateX(-50%)',
            backgroundColor: '#fffa',
            borderRadius: 5,
          }}
        >
          {hoveredNode.arn}
        </p>
      )}
    </div>
  );
};
