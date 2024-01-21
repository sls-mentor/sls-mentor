import { LiveGraph } from './LiveGraph';

import './global.css';
import { useGraphData } from './useGraphData';

const App = (): JSX.Element => {
  const graphData = useGraphData();

  if (graphData === undefined) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: '1em',
        }}
      >
        <p style={{ color: 'white', fontWeight: 600, fontSize: '2em' }}>
          Could not load graph data.
        </p>
        <p style={{ color: 'white' }}>
          Check if your filters matched at least one AWS resource.
        </p>
      </div>
    );
  }

  return <LiveGraph data={graphData} />;
};

export default App;
