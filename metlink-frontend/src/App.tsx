import { useEffect, useState } from 'react';
import StopList from '../src/components/stopList';
import PredictionPanel from '../src/components/predictionPanel';
import './App.css';

type Stop = {
  stopId: string;
  stopName: string;
  latitude: number;
  longitude: number;
};

type Prediction = {
  departure: string;
  line: string;
};

function App() {
  const [stops, setStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredStops, setFilteredStops] = useState<Stop[]>([]);
  const [selectedStop, setSelectedStop] = useState<string>('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [search, setSearch] = useState('');
  const selectedStopObj = stops.find((s) => s.stopId === selectedStop);
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


    useEffect(() => {
    if (!selectedStop) return;

    fetch(`/api/metlink/stop-predictions/${selectedStop}`)
      .then((res) => res.json())
      .then((data) => {
        const departures = data.departures?.map((d: any) => ({
          departure: d.aimedDeparture,
          line: d.service?.line,
        })) || [];
        setPredictions(departures);
      });
  }, [selectedStop]);

   useEffect(() => {
    const lower = search.toLowerCase();
    const filtered = stops.filter((s) =>
      s.stopName.toLowerCase().includes(lower)
    );
    setFilteredStops(filtered);
  }, [search, stops]);

     return (
    <div className="container">
      <h1>Metlink Stops</h1>

      <input
        placeholder="Search stops..."
        className="search-bar"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="stop-list-container">
      <StopList 
        stops={filteredStops} 
        onSelect={setSelectedStop} 
        selectedStopId={selectedStop}/>
      </div>
      {selectedStop && selectedStopObj && (
        <PredictionPanel 
          stopId={selectedStop} 
          predictions={predictions} 
          stopName={selectedStopObj.stopName}/>
      )}
    </div>
  );
}

export default App;
