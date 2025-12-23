import React, { useMemo, useState } from 'react';
import boxscores from "./boxscores.json";
import roster from "./players.json";
import "bootstrap/dist/css/bootstrap.min.css";

// --- HELPERS ---

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

function aggregateTeamStats(boxscores, allTeams) {
    const teamStats = {};

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

    boxscores.forEach(game => {
        const visitor = game.visitor;
        const home = game.home;
        const visitorScore = Number(game.visitorScore?.total) || 0;
        const homeScore = Number(game.homeScore?.total) || 0;

        if (!teamStats[visitor] || !teamStats[home]) return; 

        if (visitorScore > homeScore) {
            teamStats[visitor].wins += 1;
            teamStats[home].losses += 1;
        } else if (homeScore > visitorScore) {
            teamStats[home].wins += 1;
            teamStats[visitor].losses += 1;
        }

        teamStats[visitor].pointsFor += visitorScore;
        teamStats[visitor].pointsAgainst += homeScore;
        teamStats[home].pointsFor += homeScore;
        teamStats[home].pointsAgainst += visitorScore;

        teamStats[visitor].games += 1;
        teamStats[home].games += 1;
        
        [...game.visitorPlayers, ...game.homePlayers].forEach(player => {
            const teamKey = game.visitorPlayers.includes(player) ? visitor : home;
            if (teamStats[teamKey] && didPlayerPlay(player)) { 
                teamStats[teamKey].summedPlayerRebounds += player.rebounds || 0;
                teamStats[teamKey].summedPlayerAssists += player.assists || 0;
            }
        });
    });

    return Object.values(teamStats).map(team => ({
        ...team,
        pointDiff: team.pointsFor - team.pointsAgainst, 
        totalPoints: team.pointsFor,
        winPct: team.games > 0 
            ? ((team.wins / team.games) * 100).toFixed(1) + '%' 
            : '0.0%',
        winPctVal: team.games > 0 ? (team.wins / team.games) : 0,
        avgScore: team.games > 0 ? (team.pointsFor / team.games).toFixed(1) : "0.0",
    }));
}

// Stats available for sorting and dynamic display
const statOptions = [
    { key: 'wins', label: 'Wins' },
    { key: 'losses', label: 'Losses' },
    { key: 'winPctVal', label: 'Win %' },
    { key: 'games', label: 'Games Played' }, 
    { key: 'avgScore', label: 'Avg Score' },
    { key: 'pointDiff', label: 'Point Diff' },
    { key: 'totalPoints', label: 'Total Points' },
    { key: 'summedPlayerRebounds', label: 'Total Rebounds' },
    { key: 'summedPlayerAssists', label: 'Total Assists' },
];

function TeamStats() {
    const [sortKey, setSortKey] = useState('wins');
    const [sortDirection, setSortDirection] = useState('desc');

    const teams = useMemo(() => aggregateTeamStats(boxscores, allTeams), []);

    // 1. Sort logic
    const sortedTeams = useMemo(() => {
        return [...teams].sort((a, b) => {
            let valA = a[sortKey];
            let valB = b[sortKey];
            
            // Handle numerical conversion for strings like "avgScore"
            if (typeof valA === 'string' && !isNaN(parseFloat(valA))) valA = parseFloat(valA);
            if (typeof valB === 'string' && !isNaN(parseFloat(valB))) valB = parseFloat(valB);

            let comparison = valB - valA; 
            return sortDirection === 'asc' ? comparison * -1 : comparison;
        });
    }, [teams, sortKey, sortDirection]);

    // 2. Dynamic Column Ordering: Move the active sort key to the front
    const dynamicColumns = useMemo(() => {
        const baseCols = [...statOptions];
        const activeIdx = baseCols.findIndex(c => c.key === sortKey);
        if (activeIdx > -1) {
            const activeCol = baseCols.splice(activeIdx, 1)[0];
            return [activeCol, ...baseCols];
        }
        return baseCols;
    }, [sortKey]);

    const handleSortRequest = (key) => {
        if (sortKey === key) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortDirection('desc');
        }
    };

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
                    cursor: pointer;
                    transition: background 0.2s;
                }
                .table thead th:hover { background: #f1f1f1; }
                .table td {
                    font-size: 0.85rem;
                    vertical-align: middle;
                    color: #444;
                }
                .team-sticky {
                    position: sticky;
                    left: 0;
                    background: white !important;
                    z-index: 2;
                    font-weight: 700;
                    min-width: 160px;
                    border-right: 2px solid #eee;
                }
                .active-col-cell {
                    background-color: #fff5f5 !important;
                    font-weight: 800;
                    color: #ff4d4d !important;
                }
                .form-select {
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
                <h1 className="section-heading">Team Standings</h1>

                {/* Filter Section to match PlayerStats.js */}
                <div className="filter-card">
                    <div className="row g-3 align-items-end">
                        <div className="col-12 col-md-4">
                            <label className="form-label">Primary Sort Category</label>
                            <select 
                                className="form-select fw-bold text-danger" 
                                value={sortKey} 
                                onChange={(e) => {
                                    setSortKey(e.target.value);
                                    setSortDirection('desc');
                                }}
                            >
                                {statOptions.map((opt) => (
                                    <option key={opt.key} value={opt.key}>{opt.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-12 col-md-8 text-md-end text-muted small italic pb-2">
                            * Active column automatically shifts left for easier comparison.
                        </div>
                    </div>
                </div>

                <div className="stats-table-wrapper">
                    <table className="table table-hover mb-0">
                        <thead>
                            <tr>
                                <th className="team-sticky">Team Name</th>
                                {dynamicColumns.map(col => (
                                    <th 
                                        key={col.key} 
                                        onClick={() => handleSortRequest(col.key)}
                                        className={sortKey === col.key ? "active-col-cell" : ""}
                                    >
                                        {col.label} {sortKey === col.key ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTeams.map((t) => (
                                <tr key={t.name}>
                                    <td className="team-sticky text-uppercase">{t.name}</td>
                                    {dynamicColumns.map(col => (
                                        <td 
                                            key={col.key} 
                                            className={sortKey === col.key ? "active-col-cell" : ""}
                                        >
                                            {/* Specialized display for Win % */}
                                            {col.key === 'winPctVal' ? t.winPct : t[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default TeamStats;