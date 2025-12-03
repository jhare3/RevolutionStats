import React from "react";

const Home = () => {
  return (
    <div className="container mt-5 text-center">
      <h1 className="display-4 fw-bold mb-3">Welcome to Revolution Basketball</h1>
      <p className="lead mb-4">
        Track player stats, team standings, box scores, and game recaps for the Revolution Basketball League.
      </p>
      <div className="d-flex justify-content-center gap-3">
        <a href="/player-stats" className="btn btn-primary btn-lg">
          Player Stats
        </a>
        <a href="/teams" className="btn btn-outline-primary btn-lg">
          Standings
        </a>
      </div>
    </div>
  );
};

export default Home;
