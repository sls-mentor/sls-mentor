interface Props {
  updateZoom: (zoom: number) => void;
}

export const Zoom = ({ updateZoom }: Props) => {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: 10,
          display: 'flex',
          flexDirection: 'row',
          gap: 2,
        }}
      >
        <button
          onClick={() => updateZoom(1.1)}
          style={{ width: '1.5em', height: '1.5em', fontSize: '1.5em' }}
        >
          +
        </button>
        <button
          onClick={() => updateZoom(1 / 1.1)}
          style={{ width: '1.5em', height: '1.5em', fontSize: '1.5em' }}
        >
          -
        </button>
      </div>
    </>
  );
};
