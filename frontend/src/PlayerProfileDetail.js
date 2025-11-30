import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import playersData from './players.json';

function PlayerProfileDetail() {
  // Use useParams hook to extract the URL parameter (the player's name)
  const { playerName } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Decode the player name
    const decodedName = decodeURIComponent(playerName);

    // 2. Find the player in the imported data
    const foundPlayer = playersData.find(
      p => p.name.toLowerCase() === decodedName.toLowerCase()
    );

    setPlayer(foundPlayer);
    setLoading(false);
  }, [playerName]);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="alert alert-info">Loading player data...</div>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">
          Player "{decodeURIComponent(playerName)}" not found.
        </div>
        <Link to="/profiles" className="btn btn-secondary mt-3">
          Back to Player Directory
        </Link>
      </div>
    );
  }

  // Simple dynamic styling based on team for card border
  const teamColorMap = {
    'Rockets': 'danger', 
    'Mavericks': 'info', 
    'Lakers': 'primary', 
    'Warriors': 'warning',
    'Bulls': 'dark'
  };
  const teamClass = teamColorMap[player.team] || 'secondary';

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          
          <div className={`card shadow-lg border-3 border-${teamClass}`}>
            <div className={`card-header text-white bg-${teamClass} text-center`}>
              <h1 className="mb-0 fw-bold">{player.name}</h1>
            </div>
            <div className="card-body p-4">
              
              {/* Profile Details Grid */}
              <div className="row mb-4 text-center">
                {/* Jersey Number */}
                <div className="col-6 col-sm-3 mb-3">
                  <p className="fw-bold mb-0 text-muted">No.</p>
                  <h3 className="text-primary">{player.number}</h3>
                </div>
                {/* Team */}
                <div className="col-6 col-sm-3 mb-3">
                  <p className="fw-bold mb-0 text-muted">Team</p>
                  <h3 className="text-dark">{player.team}</h3>
                </div>
                {/* Position */}
                <div className="col-6 col-sm-3 mb-3">
                  <p className="fw-bold mb-0 text-muted">Position</p>
                  <h3 className="text-dark">{player.position}</h3>
                </div>
                {/* Height */}
                <div className="col-6 col-sm-3 mb-3">
                  <p className="fw-bold mb-0 text-muted">Height</p>
                  <h3 className="text-dark">{player.height}</h3>
                </div>
              </div>

              {/* Years in League */}
              <div className="bg-light p-3 rounded-3 mb-4 border border-secondary">
                <p className="mb-1 text-muted">Years in League:</p>
                <h4 className="fw-normal">{player.yearsInLeague} {player.yearsInLeague === 1 ? 'Season' : 'Seasons'}</h4>
              </div>
              
              {/* Bio */}
              <h5 className="mb-3 text-secondary border-bottom pb-2">Player Bio</h5>
              <p className="card-text lead text-dark">
                {player.bio}
              </p>

            </div>
            <div className="card-footer text-end">
              <Link to="/profiles" className="btn btn-outline-secondary">
                ← Back to Directory
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerProfileDetail;