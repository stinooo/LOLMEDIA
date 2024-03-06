import '../css/Leaderboardpage.css';
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Leaderboard } from "../Leaderboardcom/Leaderboard";

interface LeaderData {
  leagueId: string;
  queueType: string;
  tier: string;
  rank: string;
  summonerId: string;
  summonerName: string;
  leaguePoints: number;
  wins: number;
  losses: number;
  veteran: boolean;
  inactive: boolean;
  freshBlood: boolean;
  hotStreak: boolean;
}

const Leaderboardpage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState<LeaderData[]>([]);
  const [server, setServer] = useState<string>("euw1");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:7000/get-Leaderboard?region=${server}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: LeaderData[] = await response.json();
        setLeaderboardData(data);
        setLoading(false);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchData();
  }, [server]);

  const handleServerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServer(e.target.value);
  };

  return (
    <div>
      <div className="navbar">
        <h1><Link className='lol-topleft' to="/">League Of Legends</Link></h1>
        <nav>
          <ul>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li><Link to="/Player/EUW1/thomaske/EUW">Players</Link></li>
            <li><Link to="#">Stats</Link></li>
          </ul>
        </nav>
      </div>
      <div className="player">
        <div className="playerContent">
          <h2>TOP from server  <select className="drop" name="server" id="serverlist" value={server} onChange={handleServerChange}>
              <option value="euw1">EUW</option>
              <option value="na1">NA</option>
              <option value="eune1">EUNE</option>
              <option value="kr1">KR</option>
            </select></h2>
          <div>
            
            </div>
            <div></div>
            <br />
            <br />
            <br />
          <div>
            {leaderboardData.map((leader, index) => (
              <Leaderboard key={index} leader={leader} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Leaderboardpage;
