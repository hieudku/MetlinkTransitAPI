import { useEffect, useState } from 'react';

type Stop = {
  stopId: string;
  stopName: string;
  latitude: number;
  longitude: number;
};

function App() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/metlink/stops')
      .then(res => res.json())
      .then(data => {
        setStops(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch stops', err);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Metlink Stops</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {stops.slice(0, 20).map(stop => (
            <li key={stop.stopId}>
              {stop.stopName} ({stop.stopId})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
