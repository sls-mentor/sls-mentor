import { SlsMentorLogo } from '../assets/iconComponents';

export const Footer = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      position: 'absolute',
      padding: '16px',
      bottom: 0,
      left: 0,
    }}
  >
    <div style={{ width: '3em' }}>{SlsMentorLogo}</div>
    <p style={{ fontSize: '1.5em', color: 'white', fontWeight: 600 }}>
      sls-mentor
    </p>
  </div>
);
