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

const Footer = () => {
  return (
    <footer className="text-center py-4 mt-auto" style={{ borderTop: '1px solid #eee', color: '#6c757d' }}>
      <div className="container">
        <p className="mb-0">&copy; Fall 2025 Revolution Basketball Stats. Made by James Hare.</p>
      </div>
    </footer>
  );
};

function App() {
  return (
    <Router>
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh', 
        backgroundColor: '#ffffff' 
      }}>
        <Navigation />
        
        {/* Main Content Area */}
        <div className="container mt-4 mb-5">
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

        <Footer />
      </div>
    </Router>
  );
}

export default App;