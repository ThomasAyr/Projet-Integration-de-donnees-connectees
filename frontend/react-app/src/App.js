import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home.js';
import Station from './Component/station-info.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/station-info" element={<Station />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;