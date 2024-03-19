import React  from "react";
import "./Leaderboard.css";
import { Link } from "react-router-dom";

export const Leaderboard = ({ leader, region }) => {
  // Calculate winrate
  const winrate = Math.round((leader.wins / (leader.wins + leader.losses)) * 100);
  return (
    // Display leaderboard information
    <div className="leaderboard-container">
      <div className="player-info">
        
        <p className="leaderboard-info player-name">
          <Link 
            to={`/temp/${region}/${leader.summonerId}`}> <p>{leader.summonerName}</p>
          </Link>
        </p>  
        <p className="leaderboard-info lp"> LP: {leader.leaguePoints}</p>
      </div>
      <div className="player-info">
        <p className="win-loss">Wins: {leader.wins}</p>
        <p className="win-loss">Losses: {leader.losses}</p>
        <p className="winrate">Winrate: {winrate}%</p>
      </div>
    </div>
  );
};
