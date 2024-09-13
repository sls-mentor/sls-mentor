import { useMemo, useState } from 'react';
import { MenuState } from './types';
import { Dashboard } from './dashboard';
import { Logo, Menu } from './layout';
import { GraphData } from '@sls-mentor/graph-core';
import { LiveGraph } from './LiveGraph';
import './Container.css';

export const Container = ({ data }: { data: GraphData }): JSX.Element => {
  const [menu, setMenu] = useState<MenuState>({
    warningsEnabled: false,
    enableCloudformationClustering: false,
    filterCloudformationStacks: [],
    clusteringByTagValue: undefined,
    seeCloudformationStacks: false,
    filterTags: {},
    openStats: false,
    enableVpcClustering: false,
    filterByName: '',
  });

  const { cfnStacks, tags } = useMemo(() => {
    const stacks = new Set<string>();
    const tags: Record<string, Set<string>> = {};

    Object.values(data.nodes).forEach(({ cloudformationStack }) => {
      if (cloudformationStack !== undefined) {
        stacks.add(cloudformationStack);
      }
    });

    Object.values(data.nodes).forEach(({ tags: nodeTags }) => {
      Object.entries(nodeTags).forEach(([key, value]) => {
        if (key !== undefined && value !== undefined) {
          if (tags[key] === undefined) {
            tags[key] = new Set<string>();
          }

          tags[key]?.add(value);
        }
      });
    });

    return {
      cfnStacks: Array.from(stacks),
      tags: Object.fromEntries(
        Object.entries(tags).map(([key, value]) => [key, Array.from(value)]),
      ),
    };
  }, [data]);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor: '#111',
      }}
    >
      {menu.openStats ? (
        <Dashboard
          nodes={data.nodes}
          setMenu={setMenu}
          tags={data.tags}
          cloudformationStacks={data.cloudformationStacks}
          menu={menu}
        />
      ) : (
        <>
          <LiveGraph menu={menu} data={data} />
          <Menu
            setMenu={setMenu}
            menu={menu}
            cfnStacks={cfnStacks}
            tags={tags}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '40%',
              right: '40%',
              display: 'flex',
            }}
          >
            <input
              type="text"
              className="searchBar"
              onInput={e =>
                setMenu({ ...menu, filterByName: e.currentTarget.value })
              }
              placeholder="Search your resource"
            />
            <div style={{ position: 'absolute', left: '1rem', top: '0.5rem' }}>
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.7099 19.2894L16.9999 15.6094C18.44 13.8138 19.1374 11.5347 18.9487 9.24072C18.76 6.94672 17.6996 4.8122 15.9854 3.27606C14.2713 1.73992 12.0337 0.918926 9.73283 0.981887C7.43194 1.04485 5.24263 1.98698 3.61505 3.61456C1.98747 5.24214 1.04534 7.43145 0.982375 9.73234C0.919414 12.0332 1.74041 14.2708 3.27655 15.9849C4.81269 17.6991 6.94721 18.7595 9.2412 18.9482C11.5352 19.1369 13.8143 18.4395 15.6099 16.9994L19.2899 20.6794C19.3829 20.7731 19.4935 20.8475 19.6153 20.8983C19.7372 20.9491 19.8679 20.9752 19.9999 20.9752C20.1319 20.9752 20.2626 20.9491 20.3845 20.8983C20.5063 20.8475 20.6169 20.7731 20.7099 20.6794C20.8901 20.493 20.9909 20.2438 20.9909 19.9844C20.9909 19.7251 20.8901 19.4759 20.7099 19.2894ZM9.9999 16.9994C8.61544 16.9994 7.26206 16.5889 6.11091 15.8197C4.95977 15.0505 4.06256 13.9573 3.53275 12.6782C3.00293 11.3991 2.86431 9.99165 3.13441 8.63378C3.4045 7.27592 4.07119 6.02864 5.05016 5.04967C6.02912 4.0707 7.27641 3.40402 8.63427 3.13392C9.99214 2.86382 11.3996 3.00245 12.6787 3.53226C13.9578 4.06207 15.051 4.95928 15.8202 6.11042C16.5894 7.26157 16.9999 8.61495 16.9999 9.99942C16.9999 11.8559 16.2624 13.6364 14.9497 14.9492C13.6369 16.2619 11.8564 16.9994 9.9999 16.9994Z"
                  fill="white"
                />
              </svg>
            </div>
          </div>
        </>
      )}
      <Logo />
    </div>
  );
};
