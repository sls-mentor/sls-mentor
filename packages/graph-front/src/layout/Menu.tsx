import { Dispatch, SetStateAction, useState } from 'react';
import { rankingKeyTranslation } from '../translations';
import { MenuState, RankingKey } from '../types';

interface Props {
  setMenu: Dispatch<SetStateAction<MenuState>>;
  menu: MenuState;
  cfnStacks: string[];
  tags: string[];
}

export const Menu = ({ setMenu, menu, cfnStacks, tags }: Props) => {
  const [currentSelection, setCurrentSelection] = useState<
    'ranking' | 'filter' | 'clustering' | undefined
  >(undefined);

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        padding: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 2,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          gap: 2,
        }}
      >
        {currentSelection === 'ranking' ? (
          <>
            {Object.values(RankingKey).map(key => (
              <button
                key={key}
                onClick={() => {
                  setCurrentSelection(undefined);
                  setMenu(m => ({
                    ...m,
                    ranking: key,
                  }));
                }}
              >
                {rankingKeyTranslation[key]}
              </button>
            ))}
            <button
              onClick={() => {
                setCurrentSelection(undefined);
                setMenu(m => ({
                  ...m,
                  ranking: undefined,
                }));
              }}
            >
              None
            </button>
          </>
        ) : (
          <></>
        )}
        {currentSelection === 'filter' ? (
          <>
            {cfnStacks.map(stack => (
              <button
                key={stack}
                onClick={() => {
                  setMenu(m => {
                    if (m.filterCloudformationStacks.includes(stack)) {
                      return {
                        ...m,
                        filterCloudformationStacks:
                          m.filterCloudformationStacks.filter(s => s !== stack),
                      };
                    }
                    return {
                      ...m,
                      filterCloudformationStacks: [
                        ...m.filterCloudformationStacks,
                        stack,
                      ],
                    };
                  });
                }}
              >
                {stack}
              </button>
            ))}
          </>
        ) : (
          <></>
        )}
        {currentSelection === 'clustering' ? (
          <>
            <button
              onClick={() => {
                setMenu(m => ({
                  ...m,
                  enableCloudformationClustering: false,
                  clusteringByTagValue: undefined,
                }));
              }}
            >
              No clustering
            </button>
            <button
              onClick={() => {
                setMenu(m => ({
                  ...m,
                  enableCloudformationClustering: true,
                  clusteringByTagValue: undefined,
                }));
              }}
            >
              CFN stacks
            </button>
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setMenu(m => ({
                    ...m,
                    enableCloudformationClustering: false,
                    clusteringByTagValue: tag,
                  }));
                }}
              >
                Tag: "{tag}"
              </button>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column-reverse',
          gap: 2,
        }}
      >
        <button
          onClick={() =>
            setMenu(m => ({
              ...m,
              warningsEnabled: !m.warningsEnabled,
            }))
          }
        >
          {menu.warningsEnabled ? 'Disable' : 'Enable'} warnings
        </button>
        <button
          onClick={() => {
            if (currentSelection === 'clustering') {
              setCurrentSelection(undefined);
            } else {
              setCurrentSelection('clustering');
            }
          }}
        >
          Graph is clustered by:{' '}
          {menu.enableCloudformationClustering
            ? 'CFN stack'
            : menu.clusteringByTagValue
            ? menu.clusteringByTagValue
            : 'None'}
        </button>
        <button
          onClick={() => {
            if (currentSelection === 'ranking') {
              setCurrentSelection(undefined);
            } else {
              setCurrentSelection('ranking');
            }
          }}
        >
          Ranking: {menu.ranking ? rankingKeyTranslation[menu.ranking] : 'None'}
        </button>
        <button
          onClick={() => {
            if (currentSelection === 'filter') {
              setCurrentSelection(undefined);
            } else {
              setCurrentSelection('filter');
            }
          }}
        >
          Add CFN stacks to filter
        </button>
      </div>
    </div>
  );
};
