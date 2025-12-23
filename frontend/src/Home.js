import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-vh-100" style={{ backgroundColor: '#ffffff' }}>
      <style>
        {`
          .hero-section {
            background-image: url("/revolutionHero.gif");
            background-size: cover;
            background-position: left center;
            position: relative;
            /* Responsive padding: smaller on mobile, larger on desktop */
            padding: clamp(4rem, 15vh, 8rem) 0;
          }

          /* Optimized glass overlay for mobile */
          .glass-hero-capsule {
            background: rgba(0, 0, 0, 0.45);
            backdrop-filter: blur(12px) saturate(160%);
            -webkit-backdrop-filter: blur(12px) saturate(160%);
            border: 1px solid rgba(255, 255, 255, 0.25);
            padding: clamp(1rem, 4vw, 1.5rem) clamp(1.5rem, 8vw, 3rem);
            border-radius: 100px;
            display: inline-block;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
            max-width: 90%; /* Prevent hitting screen edges on mobile */
          }

          /* Shrunken title with fluid sizing for mobile/iPhone */
          .hero-title-pop {
            font-size: clamp(1.5rem, 6vw, 2.5rem);
            font-weight: 900;
            letter-spacing: -0.5px;
            color: #ff4d4d;
            text-shadow: 0 0 15px rgba(255, 77, 77, 0.3), 2px 2px 4px rgba(0, 0, 0, 0.8);
            margin: 0;
            line-height: 1.1;
          }

          .hero-subtitle {
            font-size: clamp(0.7rem, 3vw, 0.9rem);
            letter-spacing: clamp(1px, 1vw, 3px);
            opacity: 0.95;
          }

          .section-heading {
            font-size: clamp(1.25rem, 5vw, 1.75rem);
            font-weight: 800;
            color: #1a1a1a;
            position: relative;
            display: inline-block;
            padding-bottom: 10px;
          }

          .section-heading::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 40px;
            height: 4px;
            background: #dc3545;
            border-radius: 2px;
          }

          /* Optimized cards for touch interaction */
          .liquid-glass-card {
            background: rgba(255, 255, 255, 0.85);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(0, 0, 0, 0.08);
            border-radius: 1.75rem;
            transition: all 0.3s ease;
            overflow: hidden;
          }

          @media (hover: hover) {
            .liquid-glass-card:hover {
              transform: translateY(-8px);
              background: #ffffff;
              box-shadow: 0 20px 40px rgba(220, 53, 69, 0.12);
              border: 1px solid rgba(220, 53, 69, 0.2);
            }
          }

          /* Ensure cards look good when stacked on mobile */
          @media (max-width: 576px) {
            .liquid-glass-card {
              border-radius: 1.25rem;
            }
          }

          .card-icon-wrapper {
            width: 44px;
            height: 44px;
            background: linear-gradient(135deg, #dc3545 0%, #921a25 100%);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 1rem;
            margin: 0 auto 1rem;
            box-shadow: 0 4px 12px rgba(220, 53, 69, 0.25);
          }

          .card-btn {
            background: #1a1a1a;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem; /* Larger touch target for mobile */
            font-size: 0.8rem;
            font-weight: 700;
            border-radius: 100px;
            transition: all 0.3s ease;
            width: 100%; /* Full width buttons on mobile feel more native */
          }

          .card-btn:active {
            transform: scale(0.95);
            background: #dc3545;
          }

          .x-small {
            font-size: 0.75rem;
            line-height: 1.4;
          }
        `}
      </style>

      {/* Hero Section */}
      <div className="hero-section text-center">
        <div className="container px-3">
          <div className="glass-hero-capsule">
            <h1 className="hero-title-pop fst-italic">
              REVOLUTION BASKETBALL
            </h1>
            <p className="text-white mt-2 mb-0 fw-bold text-uppercase hero-subtitle">
              The Fall League Hub
            </p>
          </div>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="container my-4 my-md-5 py-4 py-md-5">
        <div className="text-center mb-4 mb-md-5">
          <h2 className="section-heading text-uppercase tracking-tight">Explore the League</h2>
        </div>
        
        <div className="row g-3 g-md-4 row-cols-1 row-cols-sm-2 row-cols-lg-4 justify-content-center">

          {/* 1. Player Stats Card */}
          <div className="col">
            <div className="card liquid-glass-card h-100 p-3 p-md-4 border-0 shadow-sm">
              <div className="card-body text-center d-flex flex-column justify-content-between p-0">
                <div>
                  <div className="card-icon-wrapper">
                    <i className="bi bi-person-fill fs-5"></i>
                  </div>
                  <h6 className="fw-bold mb-2 text-dark small">PLAYER STATS</h6>
                  <p className="card-text text-muted x-small">League leaders and detailed performance metrics.</p>
                </div>
                <Link to="/player-stats" className="card-btn mt-3 text-decoration-none d-flex align-items-center justify-content-center">
                  VIEW STATS
                </Link>
              </div>
            </div>
          </div>

          {/* 2. Standings Card */}
          <div className="col">
            <div className="card liquid-glass-card h-100 p-3 p-md-4 border-0 shadow-sm">
              <div className="card-body text-center d-flex flex-column justify-content-between p-0">
                <div>
                  <div className="card-icon-wrapper">
                    <i className="bi bi-bar-chart-fill fs-5"></i>
                  </div>
                  <h6 className="fw-bold mb-2 text-dark small">STANDINGS</h6>
                  <p className="card-text text-muted x-small">Real-time team rankings and seasonal records.</p>
                </div>
                <Link to="/teams" className="card-btn mt-3 text-decoration-none d-flex align-items-center justify-content-center">
                  VIEW STANDINGS
                </Link>
              </div>
            </div>
          </div>
          
          {/* 3. Box Scores Card */}
          <div className="col">
            <div className="card liquid-glass-card h-100 p-3 p-md-4 border-0 shadow-sm">
              <div className="card-body text-center d-flex flex-column justify-content-between p-0">
                <div>
                  <div className="card-icon-wrapper">
                    <i className="bi bi-list-columns-reverse fs-5"></i>
                  </div>
                  <h6 className="fw-bold mb-2 text-dark small">BOX SCORES</h6>
                  <p className="card-text text-muted x-small">Full game logs and individual scoring breakdowns.</p>
                </div>
                <Link to="/boxscores" className="card-btn mt-3 text-decoration-none d-flex align-items-center justify-content-center">
                  VIEW SCORES
                </Link>
              </div>
            </div>
          </div>

          {/* 4. Game Recaps Card */}
          <div className="col">
            <div className="card liquid-glass-card h-100 p-3 p-md-4 border-0 shadow-sm">
              <div className="card-body text-center d-flex flex-column justify-content-between p-0">
                <div>
                  <div className="card-icon-wrapper">
                    <i className="bi bi-file-text-fill fs-5"></i>
                  </div>
                  <h6 className="fw-bold mb-2 text-dark small">GAME RECAPS</h6>
                  <p className="card-text text-muted x-small">Highlights, analysis, and weekly summaries.</p>
                </div>
                <Link to="/recaps" className="card-btn mt-3 text-decoration-none d-flex align-items-center justify-content-center">
                  READ RECAPS
                </Link>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Home;