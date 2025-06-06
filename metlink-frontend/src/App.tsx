import { styled } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Box, ThemeProvider, createTheme } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StopBrowser from './pages/StopBrowser';
import MapPage from './pages/MapPage';
import AboutPage from './pages/AboutPage';

const theme = createTheme({
  palette: {
    primary: { main: '#0d47a1' },
    secondary: { main: '#ff6f00' },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
    button: { textTransform: 'none' },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <CssBaseline />
      <Navbar />
      <Box display="flex" flexDirection="column" minHeight="100vh">
        <Box component="main" flex={1}>
          <Routes>
            <Route path="/" element={<StopBrowser />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Box>
        <Footer />
      </Box>
    </Router>
  </ThemeProvider>
);
/* Trigger workflow test*/
export default App;
