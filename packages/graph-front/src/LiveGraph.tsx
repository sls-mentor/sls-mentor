import { GraphData, SubnetType } from '@sls-mentor/graph-core';
import { ArnAwsIcons } from './assets/iconComponents';

import { Zoom, Footer } from './layout';
import { useGraph } from './useGraph';
import { MenuState } from './types';

const VPC_CLUSTER_MARGIN = 50;
const VPC_SECURITY_GROUP_CLUSTER_MARGIN = 25;
const VPC_COLOR = '#8011ea';
const VPC_SECURITY_GROUP_COLOR = '#da79f7';

const subnetColor = {
  [SubnetType.PRIVATE]: '#FF6F59',
  [SubnetType.PUBLIC]: '#43AA8B',
  [SubnetType.PRIVATE_WITH_NAT]: '#FEE440',
};

export const LiveGraph = ({
  data,
  menu,
}: {
  data: GraphData;
  menu: MenuState;
}): JSX.Element => {
  const {
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
    containerRef,
  } = useGraph(data, menu);

  const {
    warningsEnabled,
    enableCloudformationClustering,
    enableVpcClustering,
    clusteringByTagValue,
    filterCloudformationStacks,
  } = menu;

  const clusteringEnabled =
    enableCloudformationClustering ||
    clusteringByTagValue !== undefined ||
    enableVpcClustering;

  console.log(clusters);
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
      }}
      ref={containerRef}
    >
      {clusteringEnabled && (
        <>
          <>
            {Object.entries(clusters).map(
              ([name, { x, y, radius, securityGroups, subnets }]) => {
                return filterCloudformationStacks.length === 0 ||
                  filterCloudformationStacks.includes(name) ? (
                  <>
                    {enableVpcClustering === true && (
                      <>
                        <div
                          style={{
                            borderRadius: '50%',
                            border: `2px solid ${VPC_COLOR}`,
                            width:
                              (radius + VPC_CLUSTER_MARGIN) * 2 * zoomLevel,
                            height:
                              (radius + VPC_CLUSTER_MARGIN) * 2 * zoomLevel,
                            left:
                              zoomLevel * (x - radius - VPC_CLUSTER_MARGIN) +
                              clientWidth / 2,
                            top:
                              zoomLevel * (y - radius - VPC_CLUSTER_MARGIN) +
                              clientHeight / 2,
                            position: 'absolute',
                          }}
                        />
                        {securityGroups &&
                          securityGroups.map(
                            ({
                              securityGroupRadius,
                              securityGroupX,
                              securityGroupY,
                            }) => (
                              <div
                                style={{
                                  borderRadius: '50%',
                                  border: `2px solid ${VPC_SECURITY_GROUP_COLOR}`,
                                  borderStyle: 'dashed',
                                  width:
                                    (securityGroupRadius +
                                      VPC_SECURITY_GROUP_CLUSTER_MARGIN) *
                                    2 *
                                    zoomLevel,
                                  height:
                                    (securityGroupRadius +
                                      VPC_SECURITY_GROUP_CLUSTER_MARGIN) *
                                    2 *
                                    zoomLevel,
                                  left:
                                    zoomLevel *
                                      (securityGroupX -
                                        securityGroupRadius -
                                        VPC_SECURITY_GROUP_CLUSTER_MARGIN) +
                                    clientWidth / 2,
                                  top:
                                    zoomLevel *
                                      (securityGroupY -
                                        securityGroupRadius -
                                        VPC_SECURITY_GROUP_CLUSTER_MARGIN) +
                                    clientHeight / 2,
                                  position: 'absolute',
                                }}
                              />
                            ),
                          )}
                        {subnets &&
                          subnets.map(
                            ({ subnetRadius, subnetX, subnetY, type }) => (
                              <div
                                style={{
                                  borderRadius: '50%',
                                  border: `2px solid ${subnetColor[type]}`,
                                  borderStyle: 'dashed',
                                  width:
                                    (subnetRadius +
                                      VPC_SECURITY_GROUP_CLUSTER_MARGIN) *
                                    2 *
                                    zoomLevel,
                                  height:
                                    (subnetRadius +
                                      VPC_SECURITY_GROUP_CLUSTER_MARGIN) *
                                    2 *
                                    zoomLevel,
                                  left:
                                    zoomLevel *
                                      (subnetX -
                                        subnetRadius -
                                        VPC_SECURITY_GROUP_CLUSTER_MARGIN) +
                                    clientWidth / 2,
                                  top:
                                    zoomLevel *
                                      (subnetY -
                                        subnetRadius -
                                        VPC_SECURITY_GROUP_CLUSTER_MARGIN) +
                                    clientHeight / 2,
                                  position: 'absolute',
                                }}
                              >
                                <p
                                  style={{
                                    fontSize: 16,
                                    color: subnetColor[type],
                                    borderRadius: 5 * zoomLevel,
                                    left:
                                      (subnetRadius +
                                        VPC_SECURITY_GROUP_CLUSTER_MARGIN) *
                                      zoomLevel,
                                    top:
                                      (subnetRadius +
                                        VPC_SECURITY_GROUP_CLUSTER_MARGIN) *
                                      2 *
                                      zoomLevel,
                                    transform: 'translateX(-50%)',
                                    width: 'max-content',
                                    padding: 1,
                                    position: 'absolute',
                                  }}
                                >
                                  {type}
                                </p>
                              </div>
                            ),
                          )}
                      </>
                    )}
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
                          backgroundColor: enableVpcClustering
                            ? VPC_COLOR
                            : '#fffa',
                          color: 'white',
                          borderRadius: 5 * zoomLevel,
                          left: nodeRadius * zoomLevel,
                          top: (radius + VPC_CLUSTER_MARGIN) * zoomLevel,
                          transform: 'translateX(-50%)',
                          width: 'max-content',
                          padding: 1,
                        }}
                      >
                        {name}
                      </p>
                    </div>
                  </>
                ) : null;
              },
            )}
          </>
        </>
      )}
      {edges.map(({ from, to, warnings }) => {
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

        const rotation = `${Math.atan2(
          fromNode.y - toNode.y,
          fromNode.x - toNode.x,
        )}rad`;

        const opacity =
          (hoveredNodeArn !== undefined &&
            (hoveredNodeArn === from || hoveredNodeArn === to)) ||
          (warnings.length > 0 && warningsEnabled)
            ? 0.5
            : 0.1;

        const left = zoomLevel * toNode.x + clientWidth / 2;
        const top = zoomLevel * toNode.y + clientHeight / 2;

        const color = warnings.length > 0 && warningsEnabled ? 'red' : 'white';

        return (
          <>
            <div
              key={`${from}-${to}`}
              style={{
                position: 'absolute',
                backgroundColor: color,
                height: 2,
                width:
                  Math.sqrt(
                    (fromNode.x - toNode.x) ** 2 + (fromNode.y - toNode.y) ** 2,
                  ) * zoomLevel,
                left,
                top,
                transform: `rotate(${rotation}) translateY(-50%)`,
                transformOrigin: 'top left',
                opacity,
              }}
            />
            {menu.seeCloudformationStacks && (
              <div
                key={`${from}-${to}-arrow`}
                style={{
                  position: 'absolute',
                  width: (nodeRadius / 2) * zoomLevel,
                  height: (nodeRadius / 2) * zoomLevel,
                  left,
                  top,
                  transform: `translate(-50%, -50%) rotate(${rotation}) translateX(${
                    nodeRadius * zoomLevel
                  }px) translate(70%) rotate(45deg)`,
                  transformOrigin: 'center',
                  borderColor: color,
                  opacity,
                  borderStyle: 'solid',
                  borderWidth: 2,
                  borderTop: 'none',
                  borderRight: 'none',
                }}
              />
            )}
            {from === to && (
              <div
                key={`${from}-${to}-loop`}
                style={{
                  position: 'absolute',
                  borderRadius: '50%',
                  height: nodeRadius * 2 * zoomLevel,
                  width: nodeRadius * 2 * zoomLevel,
                  left,
                  top: top - 2 * (nodeRadius * zoomLevel + 1),
                  opacity,
                  border: '2px solid',
                  borderColor: color,
                }}
              />
            )}
          </>
        );
      })}
      {Object.entries(nodes).map(([arn, node]) =>
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
          </div>
        ) : null,
      )}
      {hoveredNode !== undefined && clickedNode === undefined && (
        <>
          <p
            style={{
              position: 'absolute',
              left: hoveredNode.x * zoomLevel + clientWidth / 2,
              top: (hoveredNode.y + nodeRadius) * zoomLevel + clientHeight / 2,
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
        </>
      )}
      <Footer />
      <Zoom updateZoom={factor => updateZoomLevel(factor)} />
    </div>
  );
};
