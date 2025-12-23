import React from "react";
// Switching BrowserRouter to HashRouter to fix 404 errors on page reload/direct navigation
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./Navigation";

// All pages are directly in src/
import Home from "./Home";
import PlayerStats from "./PlayerStats";
import TeamStats from "./TeamStats";
import PlayerDirectory from "./PlayerDirectory";
import PlayerProfileDetail from "./PlayerProfileDetail";
import Recaps from "./Recaps.jsx";
import BoxScores from "./BoxScores";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Navigation />
      {/* Container wrapper for site-wide background and spacing */}
      <div style={{ backgroundColor: '#ffffff' }}>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/player-stats" element={<PlayerStats />} />
            <Route path="/teams" element={<TeamStats />} />
            <Route path="/recaps" element={<Recaps />} />
            <Route path="/profiles" element={<PlayerDirectory />} />
            <Route path="/profiles/:playerName" element={<PlayerProfileDetail />} />
            <Route path="/boxscores" element={<BoxScores />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;