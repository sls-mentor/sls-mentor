import { rankingKeyTranslation } from '../translations';
import { RankingKey } from '../types';

interface Props {
  setRanking: (ranking: RankingKey | undefined) => void;
}

export const RankingSelect = ({ setRanking }: Props) => (
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
    {Object.values(RankingKey).map(key => (
      <button key={key} onClick={() => setRanking(key)}>
        {rankingKeyTranslation[key]}
      </button>
    ))}
    <button onClick={() => setRanking(undefined)}>None</button>
  </div>
);
