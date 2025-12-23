import React from "react";
import { Link, useLocation } from "react-router-dom";

// Note: Bootstrap imports are expected to be available via CDN or local installation
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navigation = () => {
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Player Stats", path: "/player-stats" },
    { name: "Standings", path: "/teams" },
    { name: "Recaps", path: "/recaps" },
    { name: "Box Scores", path: "/boxscores" },
  ];

  return (
    <>
      <style>
        {`
          .glass-nav-container {
            position: sticky;
            top: 15px;
            z-index: 1050;
            width: 100%;
            padding: 0 15px;
          }

          .glass-navbar {
            background: rgba(255, 255, 255, 0.05); /* Very translucent */
            backdrop-filter: blur(12px) saturate(180%);
            -webkit-backdrop-filter: blur(12px) saturate(180%);
            border: 1px solid rgba(255, 255, 255, 0.15);
            border-radius: 100px; /* Capsule shape */
            padding: 0.5rem 1.5rem;
            transition: all 0.3s ease;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
          }

          /* Dark theme text optimization */
          .glass-navbar .navbar-brand, 
          .glass-navbar .nav-link {
            color: rgba(147, 147, 147, 0.85) !important;
            font-weight: 500;
            transition: color 0.2s ease;
          }

          .glass-navbar .nav-link:hover {
            color: #ff4d4d !important; /* Revolution Red accent */
          }

          .glass-navbar .nav-link.active {
            color: #000000ff !important;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50px;
            padding-left: 1rem;
            padding-right: 1rem;
          }

          .navbar-toggler {
            border: none !important;
            padding: 0;
          }

          .navbar-toggler:focus {
            box-shadow: none !important;
          }

          .glass-logo {
            height: 45px;
            margin-right: 12px;
            border-radius: 50%;
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          @media (max-width: 991px) {
            .glass-navbar {
              border-radius: 20px;
              padding: 0.75rem 1rem;
            }
            .navbar-collapse {
              background: rgba(0, 0, 0, 0.2);
              border-radius: 15px;
              margin-top: 10px;
              padding: 15px;
            }
          }
        `}
      </style>

      <div className="glass-nav-container">
        <nav className="navbar navbar-expand-lg glass-navbar">
          <div className="container-fluid p-0">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img
                src="/revolutionLogo.jpg"
                alt="Logo"
                className="glass-logo"
              />
              <span className="d-none d-sm-inline">Revolution Basketball</span>
            </Link>

            <button
              className="navbar-toggler text-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <i className="bi bi-list fs-1 text-white"></i>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto align-items-center">
                {navLinks.map((link) => (
                  <li className="nav-item mx-lg-1" key={link.path}>
                    <Link
                      className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                      to={link.path}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navigation;