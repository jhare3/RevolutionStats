import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Standard Bootstrap imports
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Navigation = () => {
  const location = useLocation();
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Player Stats", path: "/player-stats" },
    { name: "Standings", path: "/teams" },
    { name: "Recaps", path: "/recaps" },
    { name: "Box Score Archives", path: "/boxscores" },
  ];

  return (
    <>
      <style>
        {`
          .custom-nav-container {
            position: sticky;
            top: 0;
            z-index: 1050;
            width: 100%;
          }

          .custom-navbar {
            background: #ffffff; /* Solid background for clarity */
            border-bottom: 2px solid #eeeeee;
            padding: 0.75rem 1.5rem;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }

          .custom-navbar .navbar-brand {
            color: #1a1a1a !important;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: -0.5px;
          }

          .custom-navbar .nav-link {
            color: #444444 !important;
            font-weight: 600;
            padding: 0.5rem 1rem !important;
            transition: color 0.2s ease;
          }

          .custom-navbar .nav-link:hover {
            color: #ff4d4d !important;
          }

          .custom-navbar .nav-link.active {
            color: #ff4d4d !important;
            position: relative;
          }

          /* Visually Obvious Hamburger Toggle */
          .navbar-toggler {
            border: 2px solid #1a1a1a !important;
            padding: 4px 8px;
            background-color: #f8f9fa !important;
          }

          /* Custom CSS Hamburger (Alternative to Bootstrap Icons) */
          .hamburger-icon {
            display: inline-block;
            width: 24px;
            height: 2px;
            background-color: #1a1a1a;
            position: relative;
            vertical-align: middle;
          }

          .hamburger-icon::before,
          .hamburger-icon::after {
            content: "";
            width: 24px;
            height: 2px;
            background-color: #1a1a1a;
            position: absolute;
            left: 0;
          }

          .hamburger-icon::before { top: -8px; }
          .hamburger-icon::after { bottom: -8px; }

          .custom-logo {
            height: 40px;
            margin-right: 12px;
            border-radius: 4px;
          }

          @media (max-width: 991px) {
            .navbar-collapse {
              background: #ffffff;
              border-top: 1px solid #eeeeee;
              margin-top: 10px;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 10px 20px rgba(0,0,0,0.1);
            }
            
            .nav-item {
              border-bottom: 1px solid #f8f9fa;
              width: 100%;
              text-align: center;
            }

            .nav-item:last-child {
              border-bottom: none;
            }

            .custom-navbar .nav-link.active {
              background-color: #fff5f5;
              border-radius: 4px;
            }
          }
        `}
      </style>

      <div className="custom-nav-container">
        <nav className="navbar navbar-expand-lg custom-navbar">
          <div className="container-fluid p-0">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img
                src="/revolutionLogo.jpg"
                alt="Logo"
                className="custom-logo"
              />
              <span>REVOLUTION</span>
            </Link>

            {/* Optimized Toggle Button */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded={isNavExpanded}
              aria-label="Toggle navigation"
              onClick={() => setIsNavExpanded(!isNavExpanded)}
            >
              <span className="hamburger-icon"></span>
            </button>

            <div 
              className={`collapse navbar-collapse ${isNavExpanded ? "show" : ""}`} 
              id="navbarNav"
            >
              <ul className="navbar-nav ms-auto align-items-center">
                {navLinks.map((link) => (
                  <li className="nav-item mx-lg-1" key={link.path}>
                    <Link
                      className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
                      to={link.path}
                      onClick={() => setIsNavExpanded(false)} // Close menu on click
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