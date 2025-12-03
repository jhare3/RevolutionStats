import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
    </Router>
  );
}

export default App;
