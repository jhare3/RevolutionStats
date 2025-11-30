import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation'; // ⬅️ NEW IMPORT
import PlayerStats from './PlayerStats';
import TeamStats from './TeamStats';
import 'bootstrap/dist/css/bootstrap.min.css';

// DELETE the old Navigation function definition here!

// The main App component that sets up the Router
function App() {
  return (
    <Router>
      <Navigation /> {/* ⬅️ SIMPLIFIED USAGE */}
      
      <Routes>
        <Route path="/" element={<PlayerStats />} />
        <Route path="/teams" element={<TeamStats />} />
      </Routes>
    </Router>
  );
}

export default App;