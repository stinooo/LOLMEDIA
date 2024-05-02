import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Leaderboard.css";

export const Leaderboard = ({ leader, region }) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchData(leader.summonerId);
  }, [leader.summonerId]);

  const fetchData = (summonerId) => {
    fetch(`http://127.0.0.1:7000/get-player-name-leaderboard?region=${region}&summonerID=${summonerId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        if (json.success === "false") {
          setErrorMessage("Error fetching match data");
          setData(null);
        } else {
          setData(json);
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        setErrorMessage("Error fetching match data");
        setData(null);
      });
  };

  // Calculate winrate
  const winrate = Math.round((leader.wins / (leader.wins + leader.losses)) * 100);

  return (
    <div className="leaderboard-container">
      <div className="player-info">
        <p className="leaderboard-info player-name">
          {data && (
            <Link to={`/player/${region}/${data.gameName}/${data.tagLine}`}>
              {data.gameName}{data.tagLine}
            </Link>
          )}
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
