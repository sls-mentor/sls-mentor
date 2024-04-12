import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { rankingKeyTranslation } from '../translations';
import { MenuState, RankingKey } from '../types';
import { FilterMenu } from './FilterMenu';

interface Props {
  setMenu: Dispatch<SetStateAction<MenuState>>;
  menu: MenuState;
  cfnStacks: string[];
  tags: Record<string, string[]>;
}

export const Menu = ({ setMenu, menu, cfnStacks, tags }: Props) => {
  const [currentSelection, setCurrentSelection] = useState<
    'ranking' | 'filter-by-cfn' | 'filter-by-tags' | 'clustering' | undefined
  >(undefined);
  const [filteredTagKey, setFilteredTagKey] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    if (currentSelection !== 'filter-by-tags') {
      setFilteredTagKey(undefined);
    }
  }, [currentSelection, setFilteredTagKey]);

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
      {filteredTagKey && (
        <FilterMenu
          tagKey={filteredTagKey}
          menu={menu}
          setMenu={setMenu}
          tagValues={tags[filteredTagKey] ?? []}
        />
      )}
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
        {currentSelection === 'filter-by-cfn' ? (
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
                {stack}{' '}
                {menu.filterCloudformationStacks.includes(stack) ? '✅' : ''}
              </button>
            ))}
          </>
        ) : (
          <></>
        )}
        {currentSelection === 'filter-by-tags' ? (
          <>
            {Object.keys(tags).map(tagKey => (
              <button
                key={tagKey}
                onClick={() => {
                  if (filteredTagKey === tagKey) {
                    setFilteredTagKey(undefined);
                  } else {
                    setFilteredTagKey(tagKey);
                  }
                }}
              >
                {tagKey}{' '}
                {(menu.filterTags[tagKey]?.length ?? 0) > 0 ? '✅' : ''}
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
            {Object.keys(tags).map(key => (
              <button
                key={key}
                onClick={() => {
                  setMenu(m => ({
                    ...m,
                    enableCloudformationClustering: false,
                    clusteringByTagValue: key,
                  }));
                }}
              >
                Tag: "{key}"
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
            if (currentSelection === 'filter-by-cfn') {
              setCurrentSelection(undefined);
            } else {
              setCurrentSelection('filter-by-cfn');
            }
          }}
        >
          Filter by CFN stack{' '}
          {menu.filterCloudformationStacks.length > 0 ? '✅' : ''}
        </button>
        <button
          onClick={() => {
            if (currentSelection === 'filter-by-tags') {
              setCurrentSelection(undefined);
            } else {
              setCurrentSelection('filter-by-tags');
            }
          }}
        >
          Filter by tags{' '}
          {Object.values(menu.filterTags).some(t => t.length > 0) ? '✅' : ''}
        </button>
        <button
          onClick={() =>
            setMenu(m => ({
              ...m,
              seeCloudformationStacks: !m.seeCloudformationStacks,
            }))
          }
        >
          {menu.seeCloudformationStacks ? 'See resources' : 'See CFN stacks'}
        </button>
      </div>
    </div>
  );
};
