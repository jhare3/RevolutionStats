import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PlayerStats from './PlayerStats'; // Your main stats content is now here
import TeamStats from './TeamStats';     // The new team stats content
import 'bootstrap/dist/css/bootstrap.min.css';

// Component for the navigation bar
function Navigation() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        {/* Logo and Brand */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/revolutionLogo.jpg"
            alt="Revolution Logo"
            style={{ height: '30px', marginRight: '10px' }}
            className="rounded"
          />
          Revolution Stats
        </Link>
        
        {/* Toggler for mobile */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">Player Stats</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/teams">Team Summary</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

// The main App component that sets up the Router
function App() {
  return (
    <Router>
      <Navigation />
      
      {/* Route Definitions */}
      <Routes>
        {/* Route for the Player Stats page (your original content) */}
        <Route path="/" element={<PlayerStats />} />
        
        {/* Route for the new Team Stats page */}
        <Route path="/teams" element={<TeamStats />} />
      </Routes>
    </Router>
  );
}

export default App;