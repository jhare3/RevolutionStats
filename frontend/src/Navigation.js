import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <img
          src="/revolutionLogo.jpg"
          alt="Revolution Basketball League Logo"
          style={{ height: '60px', marginRight: '15px' }}
          className="rounded"
        />
        {/* Logo/Brand always links to the home page (Player Stats) */}
        <Link className="navbar-brand fw-bold" to="/">
          Revolution League Stats
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            
            {/* Link to Player Stats (Home) */}
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Player Stats
              </Link>
            </li>

             {/* Link to Team Stats */}
            <li className="nav-item">
              <Link className="nav-link" to="/teams">
                Standings
              </Link>
            </li>

            {/* Link to Player Profiles Directory */}
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">
                Player Profiles
              </Link>
            </li>
            
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;