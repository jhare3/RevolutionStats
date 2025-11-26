import React, { useState, useMemo } from "react";
import boxscores from "./boxscores.json";
import roster from "./players.json";
import "bootstrap/dist/css/bootstrap.min.css";

// Helper function definitions (calculatePercent, calculateTotals, didPlayerPlay) remain the same
const statOptions = [
  "ppg",
  "apg",
  "rpg",
  "ftpct",
  "fg3pct",
];

function calculatePercent(made, attempt) {
  if (attempt === 0) return "0%";
  return ((made / attempt) * 100).toFixed(0) + "%";
}

function calculateTotals(players) {
  const totals = {
    points: 0,
    rebounds: 0,
    assists: 0,
    fgm: 0,
    fga: 0,
    fg2m: 0,
    fg2a: 0,
    fg3m: 0,
    fg3a: 0,
    ftm: 0,
    fta: 0,
    gamesPlayed: 0,
  };

  players.forEach((p) => {
    totals.points += p.points;
    totals.rebounds += p.rebounds;
    totals.assists += p.assists;
    totals.fgm += p.fgm;
    totals.fga += p.fga;
    totals.fg2m += p.fg2m;
    totals.fg2a += p.fg2a;
    totals.fg3m += p.fg3m;
    totals.fg3a += p.fg3a;
    totals.ftm += p.ftm;
    totals.fta += p.fta;
    totals.gamesPlayed += p.gamesPlayed || 1;
  });

  const games = totals.gamesPlayed;
  totals.fgpct = calculatePercent(totals.fgm, totals.fga);
  totals.fg2pct = calculatePercent(totals.fg2m, totals.fg2a);
  totals.fg3pct = calculatePercent(totals.fg3m, totals.fg3a);
  totals.ftpct = calculatePercent(totals.ftm, totals.fta);

  totals.ppg = games > 0 ? (totals.points / games).toFixed(1) : 0;
  totals.rpg = games > 0 ? (totals.rebounds / games).toFixed(1) : 0;
  totals.apg = games > 0 ? (totals.assists / games).toFixed(1) : 0;

  return totals;
}

const allTeams = Array.from(new Set(roster.map(p => p.team)));
const playerRosterMap = new Map(roster.map(player => [player.name, player]));

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


function App() {
  const [selectedGame, setSelectedGame] = useState("all");
  const [selectedTeam, setSelectedTeam] = useState("all");
  const [statFilter, setStatFilter] = useState("ppg");
  const [searchQuery, setSearchQuery] = useState("");

  const players = useMemo(() => {
    let filteredPlayers = [];

    // --- 1. GAME AGGREGATION / SELECTION ---
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
            number: staticData.number
          };
        } else {
          const coreStatsToSum = ["points", "rebounds", "assists", "fgm", "fga", "fg2m", "fg2a", "fg3m", "fg3a", "ftm", "fta"];
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
      })).filter(p => p.gamesPlayed > 0);

    } else {
      // Single Game Selected
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

            fgpct: calculatePercent(p.fgm, p.fga),
            fg2pct: calculatePercent(p.fg2m, p.fg2a),
            fg3pct: calculatePercent(p.fg3m, p.fg3a),
            ftpct: calculatePercent(p.ftm, p.fta),
          };
      }).filter(p => playerRosterMap.has(p.name) && p.gamesPlayed > 0);
    }

    // --- 2. TEAM FILTERING ---
    if (selectedTeam !== "all") {
      filteredPlayers = filteredPlayers.filter(p => p.team === selectedTeam);

      if (selectedGame === "all") {
        const teamGamesPlayed = {};
        const gamesForSelectedTeam = boxscores.filter(
          g => g.visitor === selectedTeam || g.home === selectedTeam
        );

        gamesForSelectedTeam.forEach(game => {
          const playersInGame = (game.visitor === selectedTeam)
            ? game.visitorPlayers
            : game.homePlayers;

          playersInGame.forEach(p => {
            const staticData = playerRosterMap.get(p.name);
            if (staticData && staticData.team === selectedTeam && didPlayerPlay(p)) {
                 teamGamesPlayed[p.name] = (teamGamesPlayed[p.name] || 0) + 1;
            }
          });
        });

        filteredPlayers = filteredPlayers.map(p => {
          const games = teamGamesPlayed[p.name] || 0;
          return {
            ...p,
            gamesPlayed: games,
            ppg: games > 0 ? (p.points / games).toFixed(1) : 0,
            rpg: games > 0 ? (p.rebounds / games).toFixed(1) : 0,
            apg: games > 0 ? (p.assists / games).toFixed(1) : 0,
          };
        }).filter(p => p.gamesPlayed > 0);
      }
    }

    // --- 3. PLAYER SEARCH FILTERING ---
    if (searchQuery) {
        const lowerCaseQuery = searchQuery.toLowerCase();
        filteredPlayers = filteredPlayers.filter(p =>
            p.name.toLowerCase().includes(lowerCaseQuery)
        );
    }

    return filteredPlayers;
  }, [selectedGame, selectedTeam, searchQuery]);

  // Sorting logic (handles Per-Game and Percentage stats correctly)
  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => {
      const valA = String(a[statFilter]).replace('%', '');
      const valB = String(b[statFilter]).replace('%', '');
      return parseFloat(valB) - parseFloat(valA);
    });
  }, [players, statFilter]);

  const displayStatOptions = statOptions;

  return (
    <div className="container mt-4">
      {/* Logo and Title container */}
      <div className="d-flex align-items-center mb-4">
        <img
          src="/revolutionLogo.jpg"
          alt="Revolution Basketball League Logo"
          style={{ height: '60px', marginRight: '15px' }}
          className="rounded"
        />
        <h1 className="mb-0">Basketball Stats</h1>
      </div>

      {/* FILTER CONTROLS: Use Bootstrap grid for mobile stacking */}
      <div className="row mb-3 g-2"> 
        {/* Search Bar */}
        <div className="col-12 col-md-3">
            <input
                type="text"
                className="form-control"
                placeholder="Search Player Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

        {/* Game Filter */}
        <div className="col-6 col-md-3">
            <select
              className="form-select"
              value={selectedGame}
              onChange={(e) => {
                setSelectedGame(e.target.value);
                if (!['ppg', 'apg', 'rpg', 'ftpct', 'fg3pct'].includes(statFilter)) {
                    setStatFilter('ppg');
                }
              }}
            >
              <option value="all">All Games</option>
              {boxscores.map((game) => (
                <option key={game.gameId} value={game.gameId}>
                  {game.visitor} vs {game.home} (Game {game.gameId})
                </option>
              ))}
            </select>
        </div>

        {/* Team Filter */}
        <div className="col-6 col-md-3">
            <select
              className="form-select"
              value={selectedTeam}
              onChange={(e) => setSelectedTeam(e.target.value)}
            >
              <option value="all">All Teams</option>
              {allTeams.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
        </div>

        {/* Stat Filter */}
        <div className="col-12 col-md-3">
            <select
              className="form-select"
              value={statFilter}
              onChange={(e) => setStatFilter(e.target.value)}
            >
              {displayStatOptions.map((stat) => (
                <option key={stat} value={stat}>
                  {stat.toUpperCase()
                      .replace('PPG', 'Points Per Game')
                      .replace('APG', 'Assists Per Game')
                      .replace('RPG', 'Rebounds Per Game')
                      .replace('FTPCT', 'Free Throw %')
                      .replace('FG3PCT', '3-Point %')
                  }
                </option>
              ))}
            </select>
        </div>
      </div>

      {/* STATS TABLE: Added table-responsive wrapper */}
      <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>No.</th>
                <th>Team</th>
                <th>Games Played</th>
                <th>PPG</th>
                <th>RPG</th>
                <th>APG</th>
                <th>Points</th>
                <th>Rebounds</th>
                <th>Assists</th>
                <th>FGM-FGA</th>
                <th>FG%</th>
                <th>2PM-2PA</th>
                <th>2P%</th>
                <th>3PM-3PA</th>
                <th>3P%</th>
                <th>FTM-FTA</th>
                <th>FT%</th>
              </tr>
            </thead>
            <tbody>
              {sortedPlayers.map((p) => (
                <tr key={p.name + p.team}>
                  <td>{p.name}</td>
                  <td>{p.number}</td>
                  <td>{p.team}</td>
                  <td>{p.gamesPlayed}</td>
                  <td>{p.ppg}</td>
                  <td>{p.rpg}</td>
                  <td>{p.apg}</td>
                  <td>{p.points}</td>
                  <td>{p.rebounds}</td>
                  <td>{p.assists}</td>
                  <td>
                    {p.fgm}-{p.fga}
                  </td>
                  <td>{p.fgpct}</td>
                  <td>
                    {p.fg2m}-{p.fg2a}
                  </td>
                  <td>{p.fg2pct}</td>
                  <td>
                    {p.fg3m}-{p.fg3a}
                  </td>
                  <td>{p.fg3pct}</td>
                  <td>
                    {p.ftm}-{p.fta}
                  </td>
                  <td>{p.ftpct}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div> {/* End table-responsive */}
    </div>
  );
}

export default App;