import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Landing from './routes/Landing'
import SpiderManDashboard from './routes/SpiderManDashboard'
import VenomDashboard from './routes/VenomDashboard'
import StyleGuide from './routes/StyleGuide'
import AlignTool from './routes/AlignTool'
import { startAmbient, stopAmbient } from './data/soundSynthesizer'

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/spiderman') {
      startAmbient('spiderman');
    } else if (location.pathname === '/venom') {
      startAmbient('venom');
    } else {
      stopAmbient();
    }
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/spiderman" element={<SpiderManDashboard />} />
        <Route path="/venom" element={<VenomDashboard />} />
        <Route path="/style-guide" element={<StyleGuide />} />
        <Route path="/align" element={<AlignTool />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AnimatedRoutes />
    </Router>
  )
}

export default App
