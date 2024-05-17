import '../css/Leaderboardpage.css';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { Leaderboard } from "./comp/Leaderboardcom/Leaderboard"

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
  const [leaderboardData, setLeaderboardData] = useState<LeaderData[]>([]);
  const [server, setServer] = useState<string>("euw1");
  const [displayedMatches, setDisplayedMatches] = useState<number>(10);
  const matchesToLoad = 5;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:7000/get-Leaderboard?region=${server}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: LeaderData[] = await response.json();
        setLeaderboardData(data);
      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
      }
    };
    fetchData();
  }, [server]);

  const handleServerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServer(e.target.value);
  };
  const loadMoreMatches = () => {
    setDisplayedMatches(prev => prev + matchesToLoad);
};


  return (
    <div>
      <div className="navbar">
        <h1><Link className='lol-topleft' to="/">LOLMedia</Link></h1>
        <nav>
          <ul>
            <li><Link to="/leaderboard">Leaderboard</Link></li>
            <li><Link to="/Player/euw1/thomasoke/EUW">Players</Link></li>
            <li><Link to="#">Stats</Link></li>
          </ul>
        </nav>
      </div>
      <div className="player">
        <div className="playerContent">
          <div className="LeaderboardContainer">
            <h2 className="leaderboard-name">Leaderboard</h2>
            <select className="dropLead" name="server" id="serverlist" value={server} onChange={handleServerChange}>
              <option value="euw1">EUW</option>
              <option value="na1">NA</option>
              <option value="eun1">EUNE</option>
              <option value="kr">KR</option>
              <option value="jp1">JP</option>
              <option value="br1">BR</option>
              <option value="la1">LAN</option>
              <option value="la2">LAS</option>
              <option value="oc1">OCE</option>
              <option value="ru">RU</option>
              <option value="tr1">TR</option>
            </select>
          </div>
          <br />
          <div>
            {leaderboardData.slice(0,displayedMatches).map((leader, index) => (
              <Leaderboard key={index} leader={leader} region={server} />
            ))}

          </div>
          <button className="loadMoreMatches"onClick={loadMoreMatches}>Load More Matches</button>
        </div>
      </div>
    </div>
  );
}

export default Leaderboardpage;
