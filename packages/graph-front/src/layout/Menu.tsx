import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { MenuState } from '../types';
import { FilterMenu } from './FilterMenu';
import MenuIcon from '../assets/menu/MenuIcon';

interface Props {
  setMenu: Dispatch<SetStateAction<MenuState>>;
  menu: MenuState;
  cfnStacks: string[];
  tags: Record<string, string[]>;
}

export const Menu = ({ setMenu, menu, cfnStacks, tags }: Props) => {
  const [currentSelection, setCurrentSelection] = useState<
    'filter-by-cfn' | 'filter-by-tags' | 'clustering' | undefined
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
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            cursor: 'pointer',
            fill: 'white',
          }}
          className="menu-icon"
          onClick={() =>
            setMenu(m => ({
              ...m,
              openStats: !m.openStats,
            }))
          }
        >
          <style>
            {`
              .menu-icon:hover {
                fill: #aaa !important;
              }
            `}
          </style>
          {MenuIcon}
        </div>
      </div>
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
                            m.filterCloudformationStacks.filter(
                              s => s !== stack,
                            ),
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
                    enableVpcClustering: false,
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
                    enableVpcClustering: false,
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
                      enableVpcClustering: false,
                    }));
                  }}
                >
                  Tag: "{key}"
                </button>
              ))}
              <button
                onClick={() => {
                  setMenu(m => ({
                    ...m,
                    enableCloudformationClustering: false,
                    enableVpcClustering: true,
                    clusteringByTagValue: undefined,
                  }));
                }}
              >
                VPC
              </button>
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
    </>
  );
};
