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
            background-position: center;
            position: relative;
            /* Narrower height for a cleaner look */
            padding: clamp(2.5rem, 10vh, 5rem) 0;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          /* Removed glass effect: Solid background with high contrast */
          .glass-hero-capsule {
            background: #1a1a1a; 
            border: 2px solid #ff4d4d;
            /* Even border/padding around text for uniform spacing */
            padding: clamp(1.25rem, 5vw, 2.25rem);
            border-radius: 12px;
            display: inline-block;
            box-shadow: 0 12px 36px rgba(0, 0, 0, 0.4);
            width: 92%;
            max-width: 650px;
          }

          /* Optimized Title for Mobile */
          .hero-title-pop {
            font-size: clamp(1.5rem, 8vw, 3rem); 
            font-weight: 900;
            letter-spacing: -1px;
            color: #ffffff; 
            text-shadow: 3px 3px 0px #ff4d4d; 
            margin: 0;
            line-height: 1.1;
            text-transform: uppercase;
          }

          .hero-subtitle {
            font-size: clamp(0.75rem, 2.8vw, 0.95rem);
            letter-spacing: 2px;
            color: #ff4d4d;
            font-weight: 800;
            margin-top: 12px;
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

          /* Solid Cards: No longer using liquid glass */
          .liquid-glass-card {
            background: #ffffff;
            border: 1px solid #eeeeee;
            border-radius: 1.75rem;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }

          @media (hover: hover) {
            .liquid-glass-card:hover {
              transform: translateY(-8px);
              box-shadow: 0 20px 40px rgba(220, 53, 69, 0.12);
              border: 1px solid rgba(220, 53, 69, 0.15);
            }
          }

          @media (max-width: 576px) {
            .liquid-glass-card {
              border-radius: 1.25rem;
            }
          }

          .card-btn {
            background: #1a1a1a;
            color: white;
            border: none;
            padding: 0.85rem 1.5rem;
            font-size: 0.8rem;
            font-weight: 700;
            border-radius: 100px;
            transition: all 0.2s ease;
            width: 100%;
          }

          .card-btn:active {
            transform: scale(0.96);
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
        <div className="container px-3 d-flex justify-content-center">
          <div className="glass-hero-capsule">
            <h1 className="hero-title-pop fst-italic">
              REVOLUTION BASKETBALL
            </h1>
            <p className="hero-subtitle text-uppercase mb-0">
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
          {/* Player Stats */}
          <div className="col">
            <div className="card liquid-glass-card h-100 p-3 p-md-4 border-0">
              <div className="card-body text-center d-flex flex-column justify-content-between p-0">
                <div>
                  <h6 className="fw-bold mb-2 text-dark small">PLAYER STATS</h6>
                  <p className="card-text text-muted x-small">League leaders and detailed performance metrics.</p>
                </div>
                <Link to="/player-stats" className="card-btn mt-3 text-decoration-none d-flex align-items-center justify-content-center">
                  VIEW STATS
                </Link>
              </div>
            </div>
          </div>

          {/* Standings */}
          <div className="col">
            <div className="card liquid-glass-card h-100 p-3 p-md-4 border-0">
              <div className="card-body text-center d-flex flex-column justify-content-between p-0">
                <div>
                  <h6 className="fw-bold mb-2 text-dark small">STANDINGS</h6>
                  <p className="card-text text-muted x-small">Real-time team rankings and seasonal records.</p>
                </div>
                <Link to="/teams" className="card-btn mt-3 text-decoration-none d-flex align-items-center justify-content-center">
                  VIEW STANDINGS
                </Link>
              </div>
            </div>
          </div>
          
          {/* Box Scores */}
          <div className="col">
            <div className="card liquid-glass-card h-100 p-3 p-md-4 border-0">
              <div className="card-body text-center d-flex flex-column justify-content-between p-0">
                <div>
                  <h6 className="fw-bold mb-2 text-dark small">BOX SCORES</h6>
                  <p className="card-text text-muted x-small">Full game logs and individual scoring breakdowns.</p>
                </div>
                <Link to="/boxscores" className="card-btn mt-3 text-decoration-none d-flex align-items-center justify-content-center">
                  VIEW SCORES
                </Link>
              </div>
            </div>
          </div>

          {/* Game Recaps */}
          <div className="col">
            <div className="card liquid-glass-card h-100 p-3 p-md-4 border-0">
              <div className="card-body text-center d-flex flex-column justify-content-between p-0">
                <div>
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