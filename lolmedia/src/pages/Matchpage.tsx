import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';

import { Matchcomp } from './comp/Match/Matchcomp';
import { BarChart } from '@mui/x-charts/BarChart';
import "../css/Matchpage.css";

const Matchpage: React.FC = () => {
    const { MatchID, server, name, tag } = useParams();
    const [matchData, setmatchData] = useState<any>(null);
    const [matchhistory, setmatchhistory] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const matchResponse = await fetch(`http://127.0.0.1:7000/get-match?MatchID=${MatchID}&region=${server}`);
                if (!matchResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const matchData = await matchResponse.json();
                setmatchData(matchData);
                console.log(MatchID);

                const matchhistoryResponse = await fetch(`http://127.0.0.1:7000/get-history?name=${name}&tag=${tag}&region=${server}`);
                if (!matchhistoryResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const matchhistory = await matchhistoryResponse.json();
                setmatchhistory(matchhistory);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchData();
    }, [MatchID, server, name, tag]);

    const repeatArray = Array.from({ length: 10 });

    //GAMEINFO
    const gameDurationSeconds = matchData ? matchData.info.gameDuration : "";
    const minutes = Math.floor(gameDurationSeconds / 60);
    const seconds = gameDurationSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    const formattedDuration = `${formattedMinutes}:${formattedSeconds}`;

    const currentTimestamp = Date.now();
    const providedTimestamp = matchData ? matchData.info.gameEndTimestamp : "";
    const difference = currentTimestamp - providedTimestamp;
    const differenceInSeconds = difference / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    const differenceInDays = differenceInHours / 24;
    let timeElapsed;
    if (differenceInDays >= 1) {
        if (differenceInDays <= 1.5) {
            timeElapsed = '1 day ago';
        } else {
            timeElapsed = `${Math.floor(differenceInDays)} days ago`;
        }
    } else if (differenceInHours >= 1) {
        const hours = Math.floor(differenceInHours);
        timeElapsed = `${hours} Hours ago`;
    } else {
        const minutes = Math.round(differenceInMinutes);
        timeElapsed = `${minutes} minutes ago`;
    }
    const gameCreationTimestamp = matchData ? matchData.info.gameCreation : "" // Assuming 0 if matchData is not available
    const gameStartDate = new Date(gameCreationTimestamp);

    // Format the date and time
    const gameDate = gameStartDate.toLocaleDateString(); // Format: MM/DD/YYYY
    const gameTime = gameStartDate.toLocaleTimeString(); // Format: HH:MM:SS

    let matchcounter = matchhistory?.indexOf(MatchID);
    const nextmatch = matchhistory ? matchhistory[matchcounter + 1] : "";
    let previousmatch = matchhistory ? matchhistory[matchcounter - 1] : "";
    if (matchcounter === 0) {
        previousmatch = matchhistory ? matchhistory[matchcounter] : "";
    }
    

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
            <div className="matchPage">
                <div className="backButtonMatch">
                    <Link className="backButtonLink" to={`/Player/${server}/${name}/${tag}`}>&lt; Go Back</Link>
                    <Link className="backButtonLink" to={`http://localhost:3000/Match/${previousmatch}/${server}/${name}/${tag}`}>previous match</Link>
                    <Link className="backButtonLink" to={`http://localhost:3000/Match/${nextmatch}/${server}/${name}/${tag}`}>next match</Link>
                </div>
                <div className="matchStart">
                    <div className="matchHeader">
                        <div className="leftTeamStats">
                            <p>Dragons: {matchData ? matchData.info.teams[0].objectives.dragon?.kills : ""}</p>
                            <p>Barons: {matchData ? matchData.info.teams[0].objectives.baron?.kills : ""}</p>
                            <p>Towers destroyed: {matchData ? matchData.info.teams[0].objectives.tower?.kills : ""}</p>
                            <p>{matchData && matchData.info.participants[0].win ? <p>WIN</p> : <p>Lose</p>}</p>
                        </div>
                        <div className="generalGameData">
                            {gameDate}
                            {gameTime}
                            <h2>Server: {server}</h2>
                            <p>Duration {formattedDuration}</p>
                            <p>{timeElapsed}</p>
                        </div>
                        <div className="rightTeamStats">
                            <p>Dragons: {matchData ? matchData.info.teams[1].objectives.dragon?.kills : ""}</p>
                            <p>Barons: {matchData ? matchData.info.teams[1].objectives.baron?.kills : ""}</p>
                            <p>Towers destroyed: {matchData ? matchData.info.teams[1].objectives.tower?.kills : ""}</p>
                            <p>{matchData && matchData.info.participants[9].win ? <p>WIN</p> : <p>Lose</p>}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="test">test</div>
            <div className="match-details">
                {repeatArray.map((_, index) => (
                    <Matchcomp index={index} matchData={matchData} server={server} tag={tag} name={name} />
                ))}
            </div>
            <div className="chart">
                
            <BarChart
      series={[
        { data: [matchData ? matchData.info.participants[0].totalDamageDealtToChampions : 0,
        matchData ? matchData.info.participants[1].totalDamageDealtToChampions : 0,
        matchData ? matchData.info.participants[2].totalDamageDealtToChampions : 0,
        matchData ? matchData.info.participants[3].totalDamageDealtToChampions : 0,
        matchData ? matchData.info.participants[4].totalDamageDealtToChampions : 0,
        matchData ? matchData.info.participants[5].totalDamageDealtToChampions : 0,
        matchData ? matchData.info.participants[6].totalDamageDealtToChampions : 0,
        matchData ? matchData.info.participants[7].totalDamageDealtToChampions : 0,
        matchData ? matchData.info.participants[8].totalDamageDealtToChampions : 0,
        matchData ? matchData.info.participants[9].totalDamageDealtToChampions : 0
        ] ,label: 'TotalDamage', color: 'grey'  },   

      ]}
      height={500}
      width={1500}
      grid={{ horizontal: true }}
      
      xAxis={[{ data: [`${matchData?.info.participants[0]?.riotIdGameName}`,`${matchData?.info.participants[1]?.riotIdGameName}`
      ,`${matchData?.info.participants[2]?.riotIdGameName}`, `${matchData?.info.participants[3]?.riotIdGameName}`,
      `${matchData?.info.participants[4]?.riotIdGameName}`,`${matchData?.info.participants[5]?.riotIdGameName}`,
      `${matchData?.info.participants[6]?.riotIdGameName}`,`${matchData?.info.participants[7]?.riotIdGameName}`
    ,`${matchData?.info.participants[8]?.riotIdGameName}`,`${matchData?.info.participants[9]?.riotIdGameName}`], scaleType: 'band', }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }} 

    />
    </div>
        </div>
    );
}

export default Matchpage;
