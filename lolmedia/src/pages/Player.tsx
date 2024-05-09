import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import '../css/playerpage.css';
import { History } from "./comp/Matchhistory/history";
import { Mastery } from "./comp/playmast/Playerpagemastery";
import { SearchBar } from "./comp/searchbar/searchBar";

function Player() {
    const { server, name, tag } = useParams();
    const [playerData, setPlayerData] = useState<any>(null);
    const [displayedMatches, setDisplayedMatches] = useState<number>(10);
    const matchesToLoad = 5;

    const fetchData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:7000/get-playerpage?name=${name}&tag=${tag}&region=${server}`);
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            if (!data["success"]) setPlayerData(data);
            if (!data["success"]) {
                setPlayerData(data);
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    useEffect(() => {
        fetchData();
    }, [name, tag, server]);

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
    const renderHistory = () => {
        if (!playerData) return null;
        return playerData[3].slice(0, displayedMatches).map((matchID: any, index: number) => (
            <History key={index} MatchID={matchID} region={server} Puuid={playerData[2]["puuid"]} name={name} tag={tag} />
        ));
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
            <div className="playerPage">
                <div className="playerInfo">
                    <div className="username">
                        <p className="name">{playerData ? playerData[2]["gameName"] : "notfound"} </p>
                        <p className="tag"> #{playerData ? playerData[2]["tagLine"] : "notfound"}</p>
                    </div>
                    <div className="IconContainer">
                        <img className="icon" src={`https://localhost/profileicon/${playerData ? playerData[1]["profileIconId"] : "notfound"}.png`} alt={`icon${playerData ? playerData[1]["profileIconId"] : "notfound"}`}></img>
                        <div className="level">{playerData ? playerData[1]["summonerLevel"] : "notfound"}</div>
                    </div>
                    <div className="rankBackground item">
                        <p className="rankName">Ranked Solo</p>
                        <br></br>
                        <img className="rankImage" src={`https://localhost/Rankicons/${playerData ? playerData[0][1]["tier"].charAt(0).toUpperCase() + playerData[0][1]["tier"].slice(1).toLowerCase() : "notfound"}.png`}
                            alt="solo duo rank" />
                        <p className="rank">{playerData ? playerData[0][1]["tier"] : "unranked"} {playerData ? playerData[0][1]["rank"] : ""}</p>
                        <p className="LP">{playerData ? playerData[0][1]["leaguePoints"] : "???"} LP
                            <br />{playerData ? playerData[0][1]["wins"] : "not found"}W/
                            {playerData ? playerData[0][1]["losses"] : "not found"}L {winPercentageSOLO}%</p>
                    </div>
                    <div className="rankBackground item">
                        <p className="rankName">Ranked Flex</p>
                        <br></br>
                        <img className="rankImage" src={`https://localhost/Rankicons/${playerData ? playerData[0][0]["tier"].charAt(0).toUpperCase() + playerData[0][0]["tier"].slice(1).toLowerCase() : "notfound"}.png`}
                            alt="Flex rank" />
                        <p className="rank">{playerData ? playerData[0][0]["tier"] : "unranked"} {playerData ? playerData[0][0]["rank"] : ""}</p>
                        <p className="LP">{playerData ? playerData[0][0]["leaguePoints"] : "????"} LP
                            <br />{playerData ? playerData[0][0]["wins"] : "not found"}W/
                            {playerData ? playerData[0][0]["losses"] : "not found"}L {winPercentageFLEX}%</p>
                    </div>
                </div>
                <div className="masteryHistory">
                    <div className="searchBarPlayer">
                        <div className="searchBar">
                            <SearchBar />
                        </div>
                    </div>
                    <div className="mastery">
                        <Mastery puuid={playerData ? playerData[2]["puuid"] : "notfound"} region={server} tag={tag} name={name} />
                    </div>
                    <div className="history">
                        {renderHistory()}
                        <button className="loadMoreMatches"onClick={loadMoreMatches}>Load More Matches</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Player;