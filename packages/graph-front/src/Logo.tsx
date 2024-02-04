import { SlsMentorLogoWhite } from './assets/iconComponents';

export const Logo = () => (
  <div
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '300px',
      height: '300px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      animation: 'disapear 2s forwards',
    }}
  >
    <div style={{ width: '50%' }}>{SlsMentorLogoWhite}</div>
    <style>
      {`
          @keyframes disapear {
            0% {
              opacity: 1;
              visibility: visible;
            }
            99% {
              opacity: 0;
            }
            100% {
              visibility: hidden;
            }
          }
        `}
    </style>
    <div
      style={{
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        filter: 'blur(25px)',
        position: 'absolute',
        zIndex: -1,
        background:
          'radial-gradient(circle at center, #0095ff 0% 10%, #00ff33 15% 30%, transparent 45%), conic-gradient(from -45deg, #df1e1e 0deg 60deg, #ff0 200deg 280deg, #df1e1e 360deg)',
      }}
    ></div>
  </div>
);
