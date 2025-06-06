import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  CssBaseline,
  Container,
  Typography,
  TextField,
  Box,
  createTheme,
  ThemeProvider
} from '@mui/material';
import { styled } from '@mui/material/styles';

import Navbar from './components/Navbar';
import StopList from './components/stopList';
import PredictionPanel from './components/predictionPanel';
import MapPage from './pages/MapPage';
import AboutPage from './pages/AboutPage';

import './App.css';

const CustomAppBar = styled('div')({
  backgroundColor: '#1e1e1e',
  borderTop: '2px solid #ff6f00',
  padding: '1rem',
  color: 'white',
  textAlign: 'center',
  marginTop: 'auto',
});

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

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d47a1',
    },
    secondary: {
      main: '#ff6f00',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    button: {
      textTransform: 'none',
    },
  },
});

const App = () => {
  const [stops, setStops] = useState<Stop[]>([]);
  const [loading, setLoading] = useState(true);
  const [filteredStops, setFilteredStops] = useState<Stop[]>([]);
  const [selectedStop, setSelectedStop] = useState<string>('');
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [search, setSearch] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  const selectedStopObj = stops.find((s) => s.stopId === selectedStop);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetch('/api/metlink/stops')
      .then((res) => res.json())
      .then((data) => {
        setStops(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch stops', err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!selectedStop) return;
    fetch(`/api/metlink/stop-predictions/${selectedStop}`)
      .then((res) => res.json())
      .then((data) => {
        const departures =
          data.departures?.map((d: any) => ({
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

  const StopBrowserPage = () => (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Bus Stops & Stations
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Current time is {currentTime.toLocaleTimeString()}
      </Typography>
      <TextField
        fullWidth
        placeholder="Search stops..."
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 3 }}
      />
      <Box className="stop-list-container" sx={{ maxHeight: 300, overflowY: 'auto', mb: 3 }}>
        <StopList
          stops={filteredStops}
          onSelect={setSelectedStop}
          selectedStopId={selectedStop}
        />
      </Box>
      {selectedStop && selectedStopObj && (
        <PredictionPanel
          stopId={selectedStop}
          predictions={predictions}
          stopName={selectedStopObj.stopName}
        />
      )}
    </Container>
  );

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <CssBaseline />
        <Navbar />
        <Routes>
          <Route path="/" element={<StopBrowserPage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
        <CustomAppBar>
          Metlink Tracker - Built with React, ASP.NET Core & MUI
        </CustomAppBar>
      </Router>
    </ThemeProvider>
  );
};

export default App;
