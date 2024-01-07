import { LiveGraph } from './LiveGraph';

import './global.css';
import { useGraphData } from './useGraphData';

const App = (): JSX.Element => {
  const graphData = useGraphData();

  if (graphData === undefined) {
    return <div>Malformed ARN, could not load graph data</div>;
  }

  return <LiveGraph data={graphData} />;
};

export default App;
