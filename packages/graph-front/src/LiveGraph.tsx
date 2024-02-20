import { GraphData } from '@sls-mentor/graph-core';
import { ArnAwsIcons } from './assets/iconComponents';

import { rankingUnitTranslation } from './translations';
import { Zoom, Footer, Header, Menu, Logo } from './layout';
import { useGraph } from './useGraph';
import { useMemo } from 'react';

export const LiveGraph = ({ data }: { data: GraphData }): JSX.Element => {
  const {
    containerRef,
    setMenu,
    edges,
    nodes,
    zoomLevel,
    clientHeight,
    clientWidth,
    hoveredNode,
    hoveredNodeArn,
    nodeRadius,
    connectedArns,
    updateHoveredNode,
    updateZoomLevel,
    updateClickedNode,
    clickedNode,
    clusters,
    menu,
  } = useGraph(data);

  const cfnStacks = useMemo(() => {
    const stacks = new Set<string>();
    Object.values(data.nodes).forEach(({ cloudformationStack }) => {
      if (cloudformationStack !== undefined) {
        stacks.add(cloudformationStack);
      }
    });
    return Array.from(stacks);
  }, [data]);

  const {
    ranking,
    warningsEnabled,
    enableClustering,
    filterCloudformationStacks,
  } = menu;

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#111',
      }}
      ref={containerRef}
    >
      {enableClustering && (
        <>
          {Object.entries(clusters).map(([name, { x, y }]) =>
            filterCloudformationStacks.length === 0 ||
            filterCloudformationStacks.includes(name) ? (
              <div
                key={name}
                style={{
                  position: 'absolute',
                  left: zoomLevel * x + clientWidth / 2,
                  top: zoomLevel * y + clientHeight / 2,
                  opacity: 0.5,
                }}
              >
                <p
                  style={{
                    position: 'absolute',
                    fontSize: 16,
                    backgroundColor: '#fffa',
                    borderRadius: 5 * zoomLevel,
                    transform: 'translate(-50%, 10%)',
                    left: nodeRadius * zoomLevel,
                    width: 'max-content',
                    padding: 1,
                  }}
                >
                  {name}
                </p>
              </div>
            ) : null,
          )}
        </>
      )}
      {ranking === undefined &&
        edges.map(({ from, to, warnings }) => {
          const fromNode = nodes[from];
          const toNode = nodes[to];

          if (
            fromNode === undefined ||
            toNode === undefined ||
            toNode.visibility === 'None' ||
            fromNode.visibility === 'None'
          ) {
            return null;
          }

          return (
            <div
              key={`${from}-${to}`}
              style={{
                position: 'absolute',
                backgroundColor:
                  warnings.length > 0 && warningsEnabled ? 'red' : 'white',
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
                  (hoveredNodeArn !== undefined &&
                    (hoveredNodeArn === from || hoveredNodeArn === to)) ||
                  (warnings.length > 0 && warningsEnabled)
                    ? 0.5
                    : 0.1,
              }}
            />
          );
        })}
      {Object.entries(nodes).map(([arn, node]) =>
        (ranking === undefined || node.rank !== undefined) &&
        node.visibility !== 'None' ? (
          <div
            key={arn}
            style={{
              position: 'absolute',
              left: zoomLevel * (node.x - nodeRadius) + clientWidth / 2,
              top: zoomLevel * (node.y - nodeRadius) + clientHeight / 2,
              opacity:
                (hoveredNodeArn === arn ||
                  connectedArns[arn] ||
                  hoveredNode === undefined) &&
                node.visibility !== 'Partial'
                  ? 1
                  : 0.5,
            }}
          >
            <div
              style={{
                width: nodeRadius * 2 * zoomLevel,
                height: nodeRadius * 2 * zoomLevel,
                borderRadius: '50%',
                overflow: 'hidden',
                cursor: 'pointer',
                border: node.pinned ? '2px solid #fffa' : 'none',
              }}
              onMouseEnter={() => updateHoveredNode(node)}
              onMouseLeave={() => updateHoveredNode(undefined)}
              onMouseDown={() => updateClickedNode(node)}
              onMouseUp={() => updateClickedNode(undefined)}
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
                {node.value.toFixed(1)} {rankingUnitTranslation[ranking]}
              </p>
            )}
          </div>
        ) : null,
      )}
      {hoveredNode !== undefined &&
        clickedNode === undefined &&
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
                pointerEvents: 'none',
                userSelect: 'none',
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
                  pointerEvents: 'none',
                  userSelect: 'none',
                }}
              >
                {hoveredNode.value.toFixed(1)} {rankingUnitTranslation[ranking]}
              </p>
            )}
          </>
        )}
      <Menu setMenu={setMenu} menu={menu} cfnStacks={cfnStacks} />
      {ranking !== undefined && <Header ranking={ranking} />}
      <Footer />
      <Logo />
      <Zoom updateZoom={factor => updateZoomLevel(factor)} />
    </div>
  );
};
