import React from "react";
import { Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";


const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
      <div className="container">
        <img
          src="/revolutionLogo.jpg"
          alt="Revolution Basketball League Logo"
          style={{ height: "60px", marginRight: "15px" }}
          className="rounded"
        />
        <Link className="navbar-brand fw-bold" to="/">
          Revolution Basketball
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
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/player-stats">
                Player Stats
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/teams">
                Standings
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/recaps">
                Recaps
              </Link>
            </li>

            {/* Player Profiles Link (Commented Out for Future Use) */}
            {/*
            <li className="nav-item">
              <Link className="nav-link" to="/profiles">
                Player Profiles
              </Link>
            </li>
            */}

            <li className="nav-item">
              <Link className="nav-link" to="/boxscores">
                Box Scores
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
