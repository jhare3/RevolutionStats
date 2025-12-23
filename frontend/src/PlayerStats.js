import React, { useState, useMemo } from "react";
import boxscores from "./boxscores.json";
import roster from "./players.json";
import "bootstrap/dist/css/bootstrap.min.css";

// --- HELPER FUNCTIONS ---

const statOptions = [
  { key: "ppg", label: "Points Per Game" },
  { key: "apg", label: "Assists Per Game" },
  { key: "rpg", label: "Rebounds Per Game" },
  { key: "spg", label: "Steals Per Game" },
  { key: "bpg", label: "Blocks Per Game" },
  { key: "ftpct", label: "Free Throw %" },
  { key: "fg3pct", label: "3-Point %" },
  { key: "points", label: "Total Points" },
  { key: "steals", label: "Total Steals" },
  { key: "blocks", label: "Total Blocks" },
  { key: "fgpct", label: "Field Goal %" },
];

function calculatePercent(made, attempt) {
  if (attempt === 0) return "0%";
  return ((made / attempt) * 100).toFixed(0) + "%";
}

function didPlayerPlay(playerStats) {
  return (
    playerStats.points > 0 ||
    playerStats.rebounds > 0 ||
    playerStats.assists > 0 ||
    playerStats.fgm > 0 ||
    playerStats.ftm > 0 ||
    playerStats.blocks > 0 ||
    playerStats.steals > 0 ||
    playerStats.turnovers > 0
  );
}

const allTeams = Array.from(new Set(roster.map(p => p.team)));
const playerRosterMap = new Map(roster.map(player => [player.name, player]));

// --- MAIN COMPONENT ---
function PlayerStats() {
  const [selectedGame, setSelectedGame] = useState("all");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [statFilter, setStatFilter] = useState("ppg");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. DATA AGGREGATION LOGIC
  const players = useMemo(() => {
    let filteredPlayers = [];

    if (selectedGame === "all") {
      const allGameAppearances = [];
      boxscores.forEach((game) => {
        const visitors = game.visitorPlayers.map(p => ({ ...p, gameTeam: game.visitor }));
        const homes = game.homePlayers.map(p => ({ ...p, gameTeam: game.home }));
        allGameAppearances.push(...visitors, ...homes);
      });

      const playerMap = {};
      allGameAppearances.forEach((p) => {
        const staticData = playerRosterMap.get(p.name);
        if (!staticData) return;
        
        const playedThisGame = didPlayerPlay(p); 

        if (!playerMap[p.name]) {
          playerMap[p.name] = {
            ...p,
            gamesPlayed: playedThisGame ? 1 : 0, 
            team: staticData.team,
            number: staticData.number,
            rebounds: p.rebounds || 0,
            assists: p.assists || 0,
            steals: p.steals || 0,
            blocks: p.blocks || 0,
            fgm: p.fgm || 0,
            fga: p.fga || 0,
            fg2m: p.fg2m || 0,
            fg2a: p.fg2a || 0,
            fg3m: p.fg3m || 0,
            fg3a: p.fg3a || 0,
            ftm: p.ftm || 0,
            fta: p.fta || 0
          };
        } else {
          const coreStatsToSum = ["points", "rebounds", "assists", "steals", "blocks", "fgm", "fga", "fg2m", "fg2a", "fg3m", "fg3a", "ftm", "fta"];
          coreStatsToSum.forEach((key) => {
              playerMap[p.name][key] += p[key] || 0;
          });
          if (playedThisGame) {
              playerMap[p.name].gamesPlayed += 1;
          }
        }
      });

      filteredPlayers = Object.values(playerMap).map((p) => ({
        ...p,
        fgpct: calculatePercent(p.fgm, p.fga),
        fg2pct: calculatePercent(p.fg2m, p.fg2a),
        fg3pct: calculatePercent(p.fg3m, p.fg3a),
        ftpct: calculatePercent(p.ftm, p.fta),
        ppg: p.gamesPlayed > 0 ? (p.points / p.gamesPlayed).toFixed(1) : 0,
        rpg: p.gamesPlayed > 0 ? (p.rebounds / p.gamesPlayed).toFixed(1) : 0,
        apg: p.gamesPlayed > 0 ? (p.assists / p.gamesPlayed).toFixed(1) : 0,
        spg: p.gamesPlayed > 0 ? (p.steals / p.gamesPlayed).toFixed(1) : 0,
        bpg: p.gamesPlayed > 0 ? (p.blocks / p.gamesPlayed).toFixed(1) : 0,
      })).filter(p => p.gamesPlayed > 0);

    } else {
      const game = boxscores.find((g) => g.gameId === Number(selectedGame));
      if (!game) return [];
      const allGamePlayers = [...game.visitorPlayers, ...game.homePlayers];

      filteredPlayers = allGamePlayers.map((p) => {
          const staticData = playerRosterMap.get(p.name);
          const gameTeam = game.visitorPlayers.includes(p) ? game.visitor : game.home;
          const playedThisGame = didPlayerPlay(p);

          return {
            ...p,
            team: staticData ? staticData.team : gameTeam,
            number: staticData ? staticData.number : p.number,
            gamesPlayed: playedThisGame ? 1 : 0, 
            ppg: p.points,
            rpg: p.rebounds,
            apg: p.assists,
            spg: p.steals || 0,
            bpg: p.blocks || 0,
            fgpct: calculatePercent(p.fgm, p.fga),
            fg2pct: calculatePercent(p.fg2m, p.fg2a),
            fg3pct: calculatePercent(p.fg3m, p.fg3a),
            ftpct: calculatePercent(p.ftm, p.fta),
          };
      }).filter(p => playerRosterMap.has(p.name) && p.gamesPlayed > 0);
    }

    if (selectedTeam !== "all") {
      filteredPlayers = filteredPlayers.filter(p => p.team === selectedTeam);
    }

    if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        filteredPlayers = filteredPlayers.filter(p =>
            p.name.toLowerCase().includes(lowerCaseQuery)
        );
    }

    return filteredPlayers;
  }, [selectedGame, selectedTeam, searchQuery]);

  // 2. SORTING LOGIC
  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => {
      const valA = String(a[statFilter]).replace('%', '');
      const valB = String(b[statFilter]).replace('%', '');
      return parseFloat(valB) - parseFloat(valA);
    });
  }, [players, statFilter]);

  // 3. DYNAMIC COLUMN DEFINITIONS
  // This logic moves the "Active" stat category to the front of the stat columns
  const dynamicColumns = useMemo(() => {
    const allStatCols = [
        { id: 'ppg', label: 'PPG', render: (p) => p.ppg },
        { id: 'rpg', label: 'RPG', render: (p) => p.rpg },
        { id: 'apg', label: 'APG', render: (p) => p.apg },
        { id: 'spg', label: 'SPG', render: (p) => p.spg },
        { id: 'bpg', label: 'BPG', render: (p) => p.bpg },
        { id: 'points', label: 'PTS', render: (p) => p.points },
        { id: 'rebounds', label: 'REB', render: (p) => p.rebounds },
        { id: 'assists', label: 'AST', render: (p) => p.assists },
        { id: 'steals', label: 'STL', render: (p) => p.steals },
        { id: 'blocks', label: 'BLK', render: (p) => p.blocks },
        { id: 'fgpct', label: 'FG%', render: (p) => <span className="text-nowrap">{p.fgm}-{p.fga} ({p.fgpct})</span> },
        { id: 'fg2pct', label: '2P%', render: (p) => <span className="text-nowrap">{p.fg2m}-{p.fg2a} ({p.fg2pct})</span> },
        { id: 'fg3pct', label: '3P%', render: (p) => <span className="text-nowrap">{p.fg3m}-{p.fg3a} ({p.fg3pct})</span> },
        { id: 'ftpct', label: 'FT%', render: (p) => <span className="text-nowrap">{p.ftm}-{p.fta} ({p.ftpct})</span> },
    ];

    const activeColIndex = allStatCols.findIndex(c => c.id === statFilter);
    if (activeColIndex > -1) {
        const activeCol = allStatCols.splice(activeColIndex, 1)[0];
        return [activeCol, ...allStatCols];
    }
    return allStatCols;
  }, [statFilter]);

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#ffffff' }}>
      <style>
        {`
          .stats-container { padding: 2rem 1rem; }
          .section-heading {
            font-size: 1.75rem;
            font-weight: 900;
            text-transform: uppercase;
            font-style: italic;
            margin-bottom: 2rem;
            border-bottom: 4px solid #ff4d4d;
            display: inline-block;
            padding-bottom: 5px;
          }
          .filter-card {
            background: #ffffff;
            border: 1px solid #eeeeee;
            border-radius: 12px;
            padding: 1.5rem;
            margin-bottom: 2rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }
          .stats-table-wrapper {
            background: white;
            border-radius: 12px;
            border: 1px solid #eeeeee;
            overflow-x: auto;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          }
          .table thead th {
            background: #f8f9fa;
            color: #1a1a1a;
            font-weight: 800;
            font-size: 0.7rem;
            text-transform: uppercase;
            border-bottom: 2px solid #dee2e6;
            white-space: nowrap;
          }
          .table td {
            font-size: 0.85rem;
            vertical-align: middle;
            color: #444;
          }
          .player-sticky {
            position: sticky;
            left: 0;
            background: white !important;
            z-index: 2;
            font-weight: 700;
            min-width: 140px;
            border-right: 2px solid #eee;
          }
          .active-col-cell {
            background-color: #fff5f5 !important;
            font-weight: 800;
            color: #ff4d4d !important;
          }
          .form-select, .form-control {
            border-radius: 8px;
            font-size: 0.9rem;
            border: 1px solid #ddd;
          }
          .form-label {
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            color: #666;
            margin-bottom: 0.4rem;
          }
        `}
      </style>

      <div className="container stats-container">
        <h1 className="section-heading">Player Stats</h1>

        {/* Filter Section */}
        <div className="filter-card">
          <div className="row g-3">
            <div className="col-12 col-md-3">
              <label className="form-label">Search Player</label>
              <input
                type="text"
                className="form-control"
                placeholder="Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="col-6 col-md-3">
              <label className="form-label">Filter Game</label>
              <select className="form-select" value={selectedGame} onChange={(e) => setSelectedGame(e.target.value)}>
                <option value="all">All Games</option>
                {boxscores.map((g) => (
                  <option key={g.gameId} value={g.gameId}>{g.visitor} vs {g.home} (G{g.gameId})</option>
                ))}
              </select>
            </div>
            <div className="col-6 col-md-3">
              <label className="form-label">Filter Team</label>
              <select className="form-select" value={selectedTeam} onChange={(e) => setSelectedTeam(e.target.value)}>
                <option value="all">All Teams</option>
                {allTeams.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="col-12 col-md-3">
              <label className="form-label">Sort Category</label>
              <select className="form-select fw-bold text-danger" value={statFilter} onChange={(e) => setStatFilter(e.target.value)}>
                {statOptions.map((opt) => <option key={opt.key} value={opt.key}>{opt.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="stats-table-wrapper">
          <table className="table table-hover mb-0">
            <thead>
              <tr>
                <th className="player-sticky">Player</th>
                <th>No.</th>
                <th>Team</th>
                <th>GP</th>
                {dynamicColumns.map(col => (
                  <th key={col.id} className={col.id === statFilter ? "active-col-cell" : ""}>
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((p) => (
                <tr key={p.name + p.team}>
                  <td className="player-sticky">{p.name}</td>
                  <td>{p.number}</td>
                  <td>{p.team}</td>
                  <td>{p.gamesPlayed}</td>
                  {dynamicColumns.map(col => (
                    <td key={col.id} className={col.id === statFilter ? "active-col-cell" : ""}>
                      {col.render(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="mt-3 text-muted small italic">
          * Tables are sorted by the selected category. The active stat is automatically moved to the left for better visibility.
        </div>
      </div>
    </div>
  );
}

export default PlayerStats;