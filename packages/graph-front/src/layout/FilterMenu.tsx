import { MenuState } from '../types';

interface Props {
  menu: MenuState;
  setMenu: (menu: MenuState) => void;
  tagKey: string;
  tagValues: string[];
}

export const FilterMenu = ({
  menu,
  setMenu,
  tagKey,
  tagValues,
}: Props): JSX.Element => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column-reverse',
        gap: 2,
      }}
    >
      {tagValues.map(tagValue => (
        <button
          onClick={() => {
            if ((menu.filterTags[tagKey] ?? []).some(t => t === tagValue)) {
              setMenu({
                ...menu,
                filterTags: {
                  ...menu.filterTags,
                  [tagKey]: (menu.filterTags[tagKey] ?? []).filter(
                    t => t !== tagValue,
                  ),
                },
              });
              return;
            } else {
              setMenu({
                ...menu,
                filterTags: {
                  ...menu.filterTags,
                  [tagKey]: [...(menu.filterTags[tagKey] ?? []), tagValue],
                },
              });
            }
          }}
          key={tagValue}
        >
          {tagValue} {menu.filterTags[tagKey]?.includes(tagValue) ? '✅' : ''}
        </button>
      ))}
    </div>
  );
};
