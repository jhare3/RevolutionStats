import React, { useMemo, useState } from 'react';
import boxscores from "./boxscores.json";
import roster from "./players.json";
import "bootstrap/dist/css/bootstrap.min.css";

// 🚨 Re-defining necessary helpers locally:
const allTeams = Array.from(new Set(roster.map(p => p.team)));

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

// 💡 Team Aggregation Function (Moved Here)
function aggregateTeamStats(boxscores, allTeams) {
    const teamStats = {};

    // 1. Initialize stats for all teams
    allTeams.forEach(team => {
        teamStats[team] = {
            name: team,
            wins: 0,
            losses: 0,
            pointsFor: 0,
            pointsAgainst: 0,
            summedPlayerRebounds: 0,
            summedPlayerAssists: 0,
            games: 0
        };
    });

    // 2. Aggregate scores, W/L, and player totals from boxscores
    boxscores.forEach(game => {
        const visitor = game.visitor;
        const home = game.home;
        
        // CRITICAL: Ensure scores are explicitly converted to Number
        const visitorScore = Number(game.visitorScore.total) || 0;
        const homeScore = Number(game.homeScore.total) || 0;

        // Robustness check: skip game if teams aren't recognized
        if (!teamStats[visitor] || !teamStats[home]) return; 

        // Update W/L
        if (visitorScore > homeScore) {
            teamStats[visitor].wins += 1;
            teamStats[home].losses += 1;
        } else {
            teamStats[home].wins += 1;
            teamStats[visitor].losses += 1;
        }

        // Update Scores and Games Played
        teamStats[visitor].pointsFor += visitorScore;
        teamStats[visitor].pointsAgainst += homeScore;
        teamStats[home].pointsFor += homeScore;
        teamStats[home].pointsAgainst += visitorScore;

        teamStats[visitor].games += 1;
        teamStats[home].games += 1;
        
        // Aggregate Player Totals (Rebounds/Assists)
        [...game.visitorPlayers, ...game.homePlayers].forEach(player => {
            const teamKey = game.visitorPlayers.includes(player) ? visitor : home;
            
            if (teamStats[teamKey] && didPlayerPlay(player)) { 
                teamStats[teamKey].summedPlayerRebounds += player.rebounds || 0;
                teamStats[teamKey].summedPlayerAssists += player.assists || 0;
            }
        });
    });

    // 3. Final Calculations (Point Differential, Win %, Total Points)
    return Object.values(teamStats).map(team => ({
        ...team,
        // The differential is correctly calculated here:
        pointDiff: team.pointsFor - team.pointsAgainst, 
        totalPoints: team.pointsFor,
        winPct: team.games > 0 
            ? ((team.wins / team.games) * 100).toFixed(1) + '%' 
            : '0%',
        avgScore: team.games > 0 ? (team.pointsFor / team.games).toFixed(1) : 0,
    }));
}


// 💡 NEW: Unified List of ALL Columns for rendering headers and data cells
const allTeamColumns = [
    { key: 'name', label: 'Team', sortable: false },
    { key: 'wins', label: 'Wins', sortable: true },
    { key: 'losses', label: 'Losses', sortable: true },
    { key: 'winPct', label: 'Win %', sortable: true },
    { key: 'games', label: 'Games Played', sortable: true }, 
    { key: 'avgScore', label: 'Avg Score', sortable: true },
    { key: 'pointDiff', label: 'Point Differential', sortable: true },
    { key: 'totalPoints', label: 'Total Points', sortable: true },
    { key: 'summedPlayerRebounds', label: 'Total Rebounds', sortable: true },
    { key: 'summedPlayerAssists', label: 'Total Assists', sortable: true },
];

function TeamStats() {
    // State for sorting
    const [sortKey, setSortKey] = useState('wins');
    const [sortDirection, setSortDirection] = useState('desc');

    // Calculate and memoize the team statistics (using the local function)
    const teams = useMemo(() => {
        const calculatedTeams = aggregateTeamStats(boxscores, allTeams);
        // console.log("Team Stats Aggregation Result:", calculatedTeams); // Debug log removed for final code
        return calculatedTeams;
    }, []);

    // Function to handle sorting when a column header is clicked
    const handleSort = (key) => {
        // Only proceed if the column is marked as sortable in the definition
        const column = allTeamColumns.find(col => col.key === key);
        if (!column || !column.sortable) return;
        
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('desc'); 
        }
    };

    // Sort the teams based on the current sort key and direction
    const sortedTeams = useMemo(() => {
        return [...teams].sort((a, b) => {
            let valA = a[sortKey];
            let valB = b[sortKey];

            if (sortKey === 'winPct') {
                valA = parseFloat(String(valA).replace('%', ''));
                valB = parseFloat(String(valB).replace('%', ''));
            } else {
                valA = Number(valA);
                valB = Number(valB);
            }

            let comparison = valB - valA; 
            return sortDirection === 'asc' ? comparison * -1 : comparison;
        });
    }, [teams, sortKey, sortDirection]);

    // Helper function to render sort icon
    const renderSortIcon = (key) => {
        if (sortKey !== key) {
            return null;
        }
        return sortDirection === 'asc' ? ' ▲' : ' ▼';
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Team Standings and Statistics</h1>

            <div className="table-responsive">
                <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                        <tr>
                            {/* Use the new unified list for headers */}
                            {allTeamColumns.map(col => (
                                <th 
                                    key={col.key} 
                                    onClick={() => handleSort(col.key)}
                                    // Use pointer for sortable columns, default for non-sortable
                                    style={{ cursor: col.sortable ? 'pointer' : 'default' }}
                                >
                                    {col.label}
                                    {renderSortIcon(col.key)}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* Use the new unified list for data cells */}
                        {sortedTeams.map((t) => (
                            <tr key={t.name}>
                                {allTeamColumns.map(col => (
                                    <td key={t.name + col.key}>
                                        {/* Special formatting for Team Name */}
                                        {col.key === 'name' ? 
                                          `**${t[col.key]}**` : 
                                          t[col.key] 
                                        }
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default TeamStats;