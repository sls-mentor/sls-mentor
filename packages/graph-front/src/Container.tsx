import { useMemo, useState } from 'react';
import { MenuState } from './types';
import { Dashboard } from './dashboard';
import { Logo, Menu } from './layout';
import { GraphData } from '@sls-mentor/graph-core';
import { LiveGraph } from './LiveGraph';

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
        </>
      )}
      <Logo />
    </div>
  );
};
