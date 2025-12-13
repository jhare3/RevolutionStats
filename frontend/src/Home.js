import React from "react";
import "./App.css"; // Assuming you have a CSS file for additional styling



const Home = () => {
  return (
    // Apply a background color style or class to this outermost div.
    // Using a style for direct application here, setting the background to 'lightgray' or a specific hex code like '#f8f9fa' (bootstrap light gray)
    <div style={{ backgroundColor: '#ffffffff' }}>
      
      {/* Hero Section */}
      <div
        className="text-white text-center py-5"
        style={{
          backgroundImage: 'url("/revolutionHero.gif")', 
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-dark bg-opacity-10 py-3">
          
          <h1 className="display-3 fw-bold mb-3 text-danger">Welcome to Revolution Basketball</h1>
          
          <p className="lead mb-4">
            Track player stats, team standings, box scores, and game recaps for the Revolution Basketball League.
          </p>
          <a href="/player-stats" className="btn btn-outline-danger text-white btn-lg me-2">
            Player Stats
          </a>
          <a href="/teams" className="btn btn-outline-danger text-white btn-lg">
            Standings
          </a>
        </div>
      </div>

      {/* Quick Links Section */}
      <div className="container my-5">
        {/* If you also want the content sections to have a white background on top of the gray page background, 
            you might need to add a background color to this container or its parent. 
            However, based on your request, we are only changing the main backdrop. */}
        <h2 className="text-center mb-4">Explore the League</h2>
        <div className="row g-4">

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Player Profiles</h5>
                <p className="card-text">Browse full profiles of all league players.</p>
                <a href="/profiles" className="btn btn-danger">
                  View Profiles
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Box Scores</h5>
                <p className="card-text">See detailed box scores for all games.</p>
                <a href="/boxscores" className="btn btn-danger">
                  View Box Scores
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body text-center">
                <h5 className="card-title">Game Recaps</h5>
                <p className="card-text">Read game recaps and highlights for each matchup.</p>
                <a href="/recaps" className="btn btn-danger">
                  View Recaps
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;