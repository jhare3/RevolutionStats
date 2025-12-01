import React from 'react';
// Import the new Route components from react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './Navigation';
import PlayerStats from './PlayerStats';
import TeamStats from './TeamStats';
import PlayerDirectory from './PlayerDirectory'; // ⬅️ NEW IMPORT: List View
import PlayerProfileDetail from './PlayerProfileDetail'; // ⬅️ NEW IMPORT: Detail View
import Recaps from './Recaps.jsx'; // ⬅️ NEW IMPORT: Blog Component
import 'bootstrap/dist/css/bootstrap.min.css';

// The main App component that sets up the Router
function App() {
  return (
    <Router>
      <Navigation />
      
      <Routes>
        <Route path="/" element={<PlayerStats />} />
        <Route path="/teams" element={<TeamStats />} />
        
        {/* Blog Route ⬅️ NEW ROUTE */}
        <Route path="/recaps" element={<Recaps />} />

        {/* List view from Navigation Bar */}
        <Route path="/profiles" element={<PlayerDirectory />} /> 
        
        {/* Detail view when a player is selected */}
        <Route path="/profiles/:playerName" element={<PlayerProfileDetail />} /> 
      </Routes>
    </Router>
  );
}

export default App;