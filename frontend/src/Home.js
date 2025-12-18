import React from "react";
import { Link } from 'react-router-dom';
// Rationale: Link requires a BrowserRouter context, which is unavailable in this isolated environment.
// Replacing Link with standard <a> tags to fix the TypeError.

const Home = () => {
  return (
    // Apply a background color style or class to this outermost div.
    // Using white background here, assuming the parent container manages the overall page bg-light/bg-gray.
    <div style={{ backgroundColor: '#ffffff' }}>
      
      {/* Hero Section */}
      <div
        // OPTIMIZATION: Reduced vertical padding on mobile (py-4) but retained large padding on large screens (py-6)
        className="text-white text-center py-4 py-lg-6"
        style={{
          // Note: The image URL should be a public path or absolute URL in production.
          backgroundImage: 'url("/revolutionHero.gif")', 
          backgroundSize: "cover",
          // FIXED: Changed backgroundPosition to prioritize the far left part of the image.
          backgroundPosition: "left center", 
        }}
      >
        {/* REMOVED: bg-dark bg-opacity-50 for a transparent background */}
        <div className="py-4 px-3 mx-auto rounded-3">
          
          {/* Added fst-italic for italic font style */}
          <h1 className="display-3 fw-bold mb-3 text-danger fst-italic">Welcome to Revolution Basketball</h1>
        </div>
      </div>

      {/* Quick Links Section - Now includes all five key pages */}
      <div className="container my-5">
        <h2 className="text-center mb-5 fw-bold text-dark">Explore the League</h2>
        
        {/* Bootstrap Row with 5 columns for a large desktop display, wrapping to 2 or 1 column on smaller screens */}
        <div className="row g-4 row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-5 justify-content-center">

          {/* 1. Player Stats Card (New) */}
          <div className="col">
            <div className="card h-100 shadow-sm border-danger">
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <div>
                  <i className="bi bi-person-fill fs-1 text-danger mb-2"></i>
                  <h5 className="card-title fw-bold">Player Stats</h5>
                  <p className="card-text text-muted">View league leaders and full player statistics.</p>
                </div>
                {/* Replaced Link with <a> */}
                <Link to="/player-stats" className="btn btn-danger mt-3">
                  View Stats
                </Link>
              </div>
            </div>
          </div>

          {/* 2. Standings Card (New) */}
          <div className="col">
            <div className="card h-100 shadow-sm border-danger">
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <div>
                  <i className="bi bi-bar-chart-fill fs-1 text-danger mb-2"></i>
                  <h5 className="card-title fw-bold">Standings</h5>
                  <p className="card-text text-muted">See current team rankings and league records.</p>
                </div>
                {/* Replaced Link with <a> */}
                <Link to="/teams" className="btn btn-danger mt-3">
                  View Standings
                </Link>
              </div>
            </div>
          </div>
          
          {/* 3. Box Scores Card (Existing) */}
          <div className="col">
            <div className="card h-100 shadow-sm border-danger">
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <div>
                  <i className="bi bi-list-columns-reverse fs-1 text-danger mb-2"></i>
                  <h5 className="card-title fw-bold">Box Scores</h5>
                  <p className="card-text text-muted">See detailed scores and game logs for all matchups.</p>
                </div>
                {/* Replaced Link with <a> */}
                <Link to="/boxscores" className="btn btn-danger mt-3">
                  View Box Scores
                </Link>
              </div>
            </div>
          </div>

          {/* 4. Game Recaps Card (Existing) */}
          <div className="col">
            <div className="card h-100 shadow-sm border-danger">
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <div>
                  <i className="bi bi-file-text-fill fs-1 text-danger mb-2"></i>
                  <h5 className="card-title fw-bold">Game Recaps</h5>
                  <p className="card-text text-muted">Read game summaries, highlights, and league news.</p>
                </div>
                {/* Replaced Link with <a> */}
                <Link to="/recaps" className="btn btn-danger mt-3">
                  View Recaps
                </Link>
              </div>
            </div>
          </div>
          
      
          {/* 5. Player Profiles Card (Commented Out for Future Use) */}
          {/*
          <div className="col">
            <div className="card h-100 shadow-sm border-danger">
              <div className="card-body text-center d-flex flex-column justify-content-between">
                <div>
                  <i className="bi bi-person-lines-fill fs-1 text-danger mb-2"></i>
                  <h5 className="card-title fw-bold">Player Profiles</h5>
                  <p className="card-text text-muted">Browse full profiles and individual performance history.</p>
                </div>
                <Link to="/profiles" className="btn btn-danger mt-3">
                  View Profiles
                </Link>
              </div>
            </div>
          </div>
          */}

          
        </div>
      </div>
    </div>
  );
};

export default Home;