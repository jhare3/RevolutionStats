import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import playersData from './players.json';

function PlayerDirectory() {
  const [searchQuery, setSearchQuery] = useState('');

  // Player filtering based on search query
  const filteredPlayers = useMemo(() => {
    if (!searchQuery) return playersData.sort((a, b) => a.name.localeCompare(b.name));
    
    const lowerCaseQuery = searchQuery.toLowerCase();
    return playersData
      .filter(p => p.name.toLowerCase().includes(lowerCaseQuery) || p.team.toLowerCase().includes(lowerCaseQuery))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [searchQuery]);

  return (
    <div className="container my-5">
       <div className="d-flex align-items-center mb-4">
        <h2 className="mb-4 text-dark border-bottom pb-2">Player Profiles Directory</h2>
      </div>
      
      
      {/* Search Input */}
      <div className="mb-4">
        <input
          type="text"
          className="form-control form-control-lg shadow-sm"
          placeholder="Search players by name or team..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Player List */}
      <div className="list-group shadow-lg rounded-3 overflow-hidden">
        {filteredPlayers.length > 0 ? (
            filteredPlayers.map(player => (
            <Link
              key={player.name}
              // Link uses the dynamic route path
              to={`/profiles/${encodeURIComponent(player.name)}`}
              className="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
            >
              <div className="fw-bold fs-5 text-primary">{player.name}</div>
              <div className="text-secondary">
                {player.team} | No. {player.number}
              </div>
            </Link>
          ))
        ) : (
            <div className="list-group-item text-center py-4 text-muted">
                No players found matching your search query.
            </div>
        )}
      </div>
      <p className="mt-3 text-muted small">Total players: {playersData.length}</p>
    </div>
  );
}

export default PlayerDirectory;