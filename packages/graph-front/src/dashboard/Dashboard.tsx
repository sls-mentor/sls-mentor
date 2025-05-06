import { Node } from '@sls-mentor/graph-core';
import { Dispatch, SetStateAction, useState } from 'react';
import { S3Dashboard } from './S3Dashboard';
import { DynamoDBDashboard } from './DynamoDBDashboard';
import { LambdaConfigurationDashboard } from './LambdaConfigurationDashboard';
import { LambdaColdStartsDashboard } from './LambdaColdStartsDashboard';
import { LambdaExecutionDashboard } from './LambdaExecutionDashboard';
import { EmptyArnAwsIcon } from '../assets/iconComponents';
import { ArnService } from '@sls-mentor/arn';
import { Curve } from './Curve';
import { getServiceColor } from './utils';
import { MenuState } from '../types';

interface Props {
  nodes: Record<string, Node>;
  setMenu: Dispatch<SetStateAction<MenuState>>;
  tags: { Key?: string; Value?: string }[];
  cloudformationStacks: string[];
  menu: MenuState;
}

const getFilteredNodes = ({
  nodes,
  filterTags,
  filterCloudformationStacks,
  filterByName,
}: {
  nodes: Record<string, Node>;
  filterTags: Record<string, string[]>;
  filterCloudformationStacks: string[];
  filterByName: string;
}) => {
  let filteredNodes: Record<string, Node> = nodes;

  if (Object.keys(filterTags).length !== 0) {
    const nodesWithTags = Object.entries(nodes).filter(([, node]) => {
      for (const [tagKey, tagValues] of Object.entries(filterTags)) {
        if (tagValues.some(value => node.tags[tagKey] === value)) {
          return true;
        }
      }
      return false;
    });
    filteredNodes = Object.fromEntries(nodesWithTags);
  }

  if (filterCloudformationStacks.length !== 0) {
    const nodesOfClusters = Object.entries(filteredNodes).filter(([, node]) =>
      filterCloudformationStacks.includes(node.cloudformationStack as string),
    );

    filteredNodes = Object.fromEntries(nodesOfClusters);
  }

  if (filterByName !== '') {
    const nodesWithName = Object.entries(filteredNodes).filter(([arn]) =>
      arn.toLowerCase().includes(filterByName.toLowerCase()),
    );

    filteredNodes = Object.fromEntries(nodesWithName);
  }

  return filteredNodes;
};

type DashboardType =
  | 'S3BucketSize'
  | 'DynamoDBTableSize'
  | 'LambdaConfiguration'
  | 'LambdaColdStarts'
  | 'LambdaExecution';

export const Dashboard = ({
  nodes,
  setMenu,
  tags,
  cloudformationStacks,
  menu,
}: Props): JSX.Element => {
  const [selectedDashboard, setSelectedDashboard] = useState<
    DashboardType | undefined
  >(undefined);

  const filteredNodes = getFilteredNodes({
    nodes,
    filterTags: menu.filterTags,
    filterCloudformationStacks: menu.filterCloudformationStacks,
    filterByName: menu.filterByName,
  });

  const nodesByService = Object.values(filteredNodes).reduce(
    (acc, node) => ({
      ...acc,
      [node.arn.service]: acc[node.arn.service] + 1,
    }),
    Object.fromEntries(
      Object.values(ArnService).map(service => [service, 0]),
    ) as Record<ArnService, number>,
  );

  const orderedNodes = Object.entries(nodesByService)
    .sort(([, count1], [, count2]) => count2 - count1)
    .filter(([, count]) => count > 0);

  return (
    <div
      style={{
        position: 'absolute',
        height: 'calc(100% - 4em)',
        width: 'calc(100% - 4em)',
        margin: '1em',
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '1em',
        background: '#222',
        padding: '1em',
      }}
    >
      {selectedDashboard === undefined && (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexGrow: 1,
            }}
          >
            <div
              style={{
                flexGrow: 1,
                flexBasis: 0,
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
              }}
            >
              <h1
                style={{ fontSize: '3em', fontWeight: '600', color: 'white' }}
              >
                YOUR AWS APP
              </h1>
              <div
                style={{
                  display: 'flex',
                  flexGrow: 1,
                  flexBasis: 0,
                  gap: '1em',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexGrow: 1,
                  }}
                >
                  <h1
                    style={{
                      fontSize: '8em',
                      fontWeight: '600',
                      color: getServiceColor(ArnService.lambda),
                    }}
                  >
                    {Object.keys(filteredNodes).length}
                  </h1>
                  <h2 style={{ fontSize: '1em' }}>Total resources</h2>
                </div>
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2em',
                    justifyContent: 'center',
                    flexGrow: 1,
                  }}
                >
                  <div>
                    <h2 style={{ marginBottom: '1em' }}>Having Tags:</h2>
                    {tags.length === 0 && (
                      <p>
                        <i>Any tag</i>
                      </p>
                    )}
                    <ul style={{ marginLeft: '2em' }}>
                      {tags.map(tag => (
                        <li key={tag.Key}>
                          {tag.Key}: {tag.Value}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h2 style={{ marginBottom: '1em' }}>Inside CFN stacks:</h2>
                    {cloudformationStacks.length === 0 && (
                      <p>
                        <i>Any stack</i>
                      </p>
                    )}
                    <ul style={{ marginLeft: '2em' }}>
                      {cloudformationStacks.map(stack => (
                        <li key={stack}>{stack}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                flexGrow: 1,
                flexBasis: 0,
                marginTop: '3em',
              }}
            >
              <Curve
                values={orderedNodes.map(([service, count]) => ({
                  value: count,
                  itemStyle: {
                    color: getServiceColor(service as ArnService),
                  },
                }))}
                labels={orderedNodes.map(([service]) => service)}
                barsColor="#444"
                unit={''}
              />
            </div>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-around',
              flexGrow: 0,
              gap: '1em',
            }}
          >
            <style>
              {`
              .dashboardButton {
                cursor: pointer;
                transition: background-color 0.3s;
              }
              .dashboardButton:hover {
                background-color: #333 !important;
              }
            `}
            </style>
            <div
              style={{
                background: '#111',
                flexGrow: 1,
                flexBasis: 0,
                padding: '1em',
              }}
              className="dashboardButton"
              onClick={() => setSelectedDashboard('S3BucketSize')}
            >
              <div>{EmptyArnAwsIcon['s3']}</div>
              <h2
                style={{
                  color: 'white',
                  fontSize: '1.5em',
                  textAlign: 'center',
                }}
              >
                BUCKET SIZE
              </h2>
            </div>
            <div
              style={{
                background: '#111',
                flexGrow: 1,
                flexBasis: 0,
                padding: '1em',
              }}
              className="dashboardButton"
              onClick={() => setSelectedDashboard('DynamoDBTableSize')}
            >
              <div>{EmptyArnAwsIcon['dynamodb']}</div>
              <h2
                style={{
                  color: 'white',
                  fontSize: '1.5em',
                  textAlign: 'center',
                }}
              >
                TABLE SIZE
              </h2>
            </div>
            <div
              style={{
                background: '#111',
                flexGrow: 1,
                flexBasis: 0,
                padding: '1em',
              }}
              className="dashboardButton"
              onClick={() => setSelectedDashboard('LambdaConfiguration')}
            >
              <div>{EmptyArnAwsIcon['lambda']}</div>
              <h2
                style={{
                  color: 'white',
                  fontSize: '1.5em',
                  textAlign: 'center',
                }}
              >
                CONFIGURATION
              </h2>
            </div>
            <div
              style={{
                background: '#111',
                flexGrow: 1,
                flexBasis: 0,
                padding: '1em',
              }}
              className="dashboardButton"
              onClick={() => setSelectedDashboard('LambdaColdStarts')}
            >
              <div>{EmptyArnAwsIcon['lambda']}</div>
              <h2
                style={{
                  color: 'white',
                  fontSize: '1.5em',
                  textAlign: 'center',
                }}
              >
                COLD STARTS
              </h2>
            </div>
            <div
              style={{
                background: '#111',
                flexGrow: 1,
                flexBasis: 0,
                padding: '1em',
              }}
              className="dashboardButton"
              onClick={() => setSelectedDashboard('LambdaExecution')}
            >
              <div>{EmptyArnAwsIcon['lambda']}</div>
              <h2
                style={{
                  color: 'white',
                  fontSize: '1.5em',
                  textAlign: 'center',
                }}
              >
                EXECUTION
              </h2>
            </div>
          </div>
        </>
      )}
      {selectedDashboard === 'S3BucketSize' && (
        <S3Dashboard nodes={filteredNodes} />
      )}
      {selectedDashboard === 'DynamoDBTableSize' && (
        <DynamoDBDashboard nodes={filteredNodes} />
      )}
      {selectedDashboard === 'LambdaConfiguration' && (
        <LambdaConfigurationDashboard nodes={filteredNodes} />
      )}
      {selectedDashboard === 'LambdaColdStarts' && (
        <LambdaColdStartsDashboard nodes={filteredNodes} />
      )}
      {selectedDashboard === 'LambdaExecution' && (
        <LambdaExecutionDashboard nodes={filteredNodes} />
      )}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          color: 'white',
          cursor: 'pointer',
          fontSize: '2em',
          fontWeight: 900,
        }}
        onClick={() =>
          selectedDashboard === undefined
            ? setMenu(m => ({
                ...m,
                openStats: false,
              }))
            : setSelectedDashboard(undefined)
        }
      >
        X
      </div>
    </div>
  );
};
