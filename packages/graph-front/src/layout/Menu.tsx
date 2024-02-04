import { Dispatch, SetStateAction } from 'react';
import { rankingKeyTranslation } from '../translations';
import { MenuState, RankingKey } from '../types';

interface Props {
  setMenu: Dispatch<SetStateAction<MenuState>>;
}

export const Menu = ({ setMenu }: Props) => (
  <div
    style={{
      position: 'absolute',
      bottom: 0,
      right: 0,
      padding: 10,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
    }}
  >
    <button
      onClick={() =>
        setMenu(menu => ({
          ...menu,
          warningsEnabled: true,
        }))
      }
    >
      Enable warnings
    </button>
    <button
      onClick={() =>
        setMenu(menu => ({
          ...menu,
          warningsEnabled: false,
        }))
      }
    >
      Disable warnings
    </button>
    {Object.values(RankingKey).map(key => (
      <button
        key={key}
        onClick={() =>
          setMenu(menu => ({
            ...menu,
            ranking: key,
          }))
        }
      >
        {rankingKeyTranslation[key]}
      </button>
    ))}
    <button
      onClick={() =>
        setMenu(menu => ({
          ...menu,
          ranking: undefined,
        }))
      }
    >
      None
    </button>
  </div>
);
