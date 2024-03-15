import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import '../css/playerpage.css';
import { History } from "./comp/Matchhistory/history";
import { Mastery } from "./comp/playmast/Playerpagemastery";

function Player() {
    const { server, name, tag } = useParams();
    const [playerData, setPlayerData] = useState<any>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:7000/get-playerpage?name=${name}&tag=${tag}&region=${server}`);
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            if (!data["success"]) setPlayerData(data);
            if(!data["success"]){
            setPlayerData(data); }
            console.log("UseEffect done");
            console.log(data);
            
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    useEffect(() => {
        fetchData();
        console.log("playerData: " + playerData)
    }, [name, tag, server]);

    // if (playerData) console.log(playerData[0]["leagueId"])
    if (playerData) console.log(playerData[0][1]["leaguePoints"])
    
    //SOLOQUEUE winrate calculation
    const winsSOLO = playerData ? playerData[0][1].wins : 0;
    const lossesSOLO = playerData ? playerData[0][1].losses : 0;
    const totalGamesSOLO = winsSOLO + lossesSOLO;
    const winPercentageSOLO = totalGamesSOLO > 0 ? Math.round((winsSOLO / totalGamesSOLO) * 100) : 0;
    
    //FLEXQUEUE winrate calculation
    const winsFLEX = playerData ? playerData[0][0].wins : 0;
    const lossesFLEX = playerData ? playerData[0][0].losses : 0;
    const totalGamesFLEX = winsFLEX + lossesFLEX;
    const winPercentageFLEX = totalGamesFLEX > 0 ? Math.round((winsFLEX / totalGamesFLEX) * 100) : 0;


    return (
        <div>
            <div className="navbar"> 
                <h1><Link className='lol-topleft' to="/">League Of Legends</Link></h1>
                <nav>
                    <ul>
                        <li><Link to="/leaderboard">Leaderboard</Link></li>
                        <li><Link to="/Player/euw1/thomasoke/EUW">Players</Link></li>
                        <li><Link to="#">Stats</Link></li>
                        
                    </ul>
                </nav>
            </div>
            <div className="player">
                <div className="playerInfo"> 
                    <div className="Mastery"> <Mastery puuid={playerData ? playerData[2]["puuid"] : "notfound"} region={server} /></div> 
                    <div className="History"> <History MatchID={playerData ? playerData[3][0] : "not found"} />  </div>
                    <div className="iconlevel">
                        <div className="username">
                            <p className="name">{playerData ? playerData[2]["gameName"] : "notfound"} </p>
                            <p className="tag"> #{playerData ? playerData[2]["tagLine"] : "notfound"}</p>
                        </div>
                        <div className="container">
                            <img className="icon" src={`https://localhost/profileicon/${playerData ? playerData[1]["profileIconId"] : "notfound"}.png`} alt={`icon${playerData ? playerData[1]["profileIconId"] : "notfound"}`}></img>
                            <div className="level">{playerData ? playerData[1]["summonerLevel"] : "notfound"}</div>
                        </div>
                    </div>
                    <div className="rankBackground">
                        <p className="rankName">Ranked Solo</p>
                        <br></br>
                        <img className="rankImage" src={`https://localhost/Rankicons/${playerData ? playerData[0][1]["tier"].charAt(0).toUpperCase() + playerData[0][1]["tier"].slice(1).toLowerCase() : "notfound"}.png`} 
                         alt="solo duo rank"/>
                        <p className="rank">{playerData ? playerData[0][1]["tier"]: "unranked"} {playerData ? playerData[0][1]["rank"]: ""}</p>
                        <p className="LP">{playerData ? playerData[0][1]["leaguePoints"]: "???" } LP
                        <br />{playerData ? playerData[0][1]["wins"]: "not found"}W / 
                         {playerData ? playerData[0][1]["losses"]:"not found"}L {winPercentageSOLO}%</p>
                    </div>
                    <div className="rankBackground">
                        <p className="rankName">Ranked Flex</p>
                        <br></br>
                        <img className="rankImage"src={`https://localhost/Rankicons/${playerData ? playerData[0][0]["tier"].charAt(0).toUpperCase() + playerData[0][0]["tier"].slice(1).toLowerCase() : "notfound"}.png`} 
                            alt="Flex rank" />
                        <p className="rank">{playerData ? playerData[0][0]["tier"]: "unranked"} {playerData ? playerData[0][0]["rank"]: ""}</p>
                        <p className="LP">{playerData ? playerData[0][0]["leaguePoints"] : "????"} LP
                        <br />{playerData ? playerData[0][0]["wins"]: "not found"}W / 
                        {playerData ? playerData[0][0]["losses"]:"not found"}L {winPercentageFLEX}%</p>
                    </div>  
                </div> 
            </div> 
        </div>
    )
}

export default Player;