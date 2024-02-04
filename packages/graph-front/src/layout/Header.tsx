import { rankingKeyTranslation, rankingUnitTranslation } from '../translations';
import { RankingKey } from '../types';

interface Props {
  ranking: RankingKey;
}

export const Header = ({ ranking }: Props) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      position: 'absolute',
      padding: '16px',
      top: 0,
      left: 0,
    }}
  >
    <p style={{ fontSize: 18, color: 'white', fontWeight: 500 }}>
      Lambda functions ranked by {rankingKeyTranslation[ranking]} (
      {rankingUnitTranslation[ranking]})
    </p>
  </div>
);
