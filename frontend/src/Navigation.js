import React from 'react';
import { Link } from 'react-router-dom';

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
              <Link className={`nav-link ${window.location.pathname === '/' ? 'active' : ''}`} to="/">Player Stats</Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${window.location.pathname === '/teams' ? 'active' : ''}`} to="/teams">Team Summary</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;