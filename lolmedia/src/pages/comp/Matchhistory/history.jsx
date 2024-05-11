import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./history.css";
import gameModesData from '../../../all json/queues1.json';


export const History = ({ MatchID ,region, Puuid , name ,tag}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [matchData, setMatchData] = useState(null);
    useEffect(() => {
        fetchData(MatchID);
    }, [MatchID]);

    const fetchData = (MatchID ) => {
        fetch("http://127.0.0.1:7000/get-match?MatchID=" + MatchID + "&region=" + region )
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((json) => {
                if (json.success === "false") {
                    setErrorMessage(""); // Set error message if match is not found
                    setMatchData(null); // Clear match data
                } else {
                    setMatchData(json); // Set match data if found
                }
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
                setErrorMessage("Error fetching match data");
                setMatchData(null);
            });
    };

    const truncateString = (str, maxLen) => {
        return str.length > maxLen ? str.substring(0, maxLen) + "" : str;
    };  

    let rightplayer = matchData?.metadata?.participants?.indexOf(Puuid);


    const gameDurationSeconds = matchData ? matchData?.info?.gameDuration: "";
    const minutes = Math.floor(gameDurationSeconds / 60);
    const seconds = gameDurationSeconds % 60;

    // Format minutes and seconds with leading zeros if necessary
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // Construct the formatted string
    const formattedDuration = `${formattedMinutes}:${formattedSeconds}`;

    const currentTimestamp = Date.now();
    const providedTimestamp = matchData ? matchData?.info?.gameEndTimestamp: "";
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
    const unKDA = matchData?.info.participants[rightplayer]?.challenges.kda ?? "";
    const KDA = Math.round(unKDA * 100) / 100;

    let gamemode = matchData ? matchData.info.queueId: "";
    const gamemodeInfo = gamemode !== "" ? gameModesData[gamemode] : null;
    {matchData && matchData?.info?.participants[0]?.win ? <p>WIN</p> : <p>Lose</p>}

    return (
        <div className="historyMain">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {matchData && (
                <div className={`history-container ${matchData && matchData.info.participants[rightplayer].win ? 'win' : 'lose'}`}>
                    <div className="groupOne">
                        <div className="historyText">
                            <p>{gamemodeInfo ? gamemodeInfo.name : "Unknown Game Mode"}</p>
                            <p>{timeElapsed}</p>
                            <p>  game {formattedDuration}</p>
                        </div>
                        <div className="iconSpells">
                            <img className="characterIcon" src={`https://localhost/champion/${matchData ? matchData?.info.participants[rightplayer]?.championName: ""}.png`} alt="champIcon" />
                            <div className="spells">
                                <img src={`https://localhost/Spels/${matchData ? matchData?.info.participants[rightplayer]?.summoner1Id: ""}.png`} alt="" />
                                <img src={`https://localhost/Spels/${matchData ? matchData?.info.participants[rightplayer]?.summoner2Id: ""}.png`} alt="" />
                            </div>
                            <div className="playerStats">
                                <p>{matchData ? matchData?.info.participants[rightplayer]?.kills: ""} / {matchData ? matchData?.info.participants[rightplayer]?.deaths: ""} / {matchData ? matchData?.info.participants[rightplayer]?.assists: ""}</p>
                                <p> {KDA} KDA</p>
                                
                                <p>{matchData ? matchData?.info.participants[rightplayer]?.totalMinionsKilled: ""} CS</p>
                                <p>{matchData ? matchData?.info.participants[rightplayer]?.totalDamageDealtToChampions: ""} DMG</p>
                            </div>
                        </div> 
                        <div className="playerItems">
                            <img src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item0: "7050"}.png`} alt="" />
                            <img src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item1: "7050"}.png`} alt="" />
                            <img src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item2: "7050"}.png`} alt=""/>
                            <img src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item3: "7050"}.png`} alt="" />
                            <img src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item4: "7050"}.png`} alt="" />
                            <img src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item5: "7050"}.png`} alt="" />
                            <img src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item6: "7050"}.png`} alt= ""/>
                        </div>
                    </div>
                    <div className="groupTwo">
                        <div className="firstFive">
                            <div className="playerOne">
                                <img src={`https://localhost/champion/${matchData ? matchData.info.participants[0].championName: ""}.png`} alt=""></img>
                                <p>
                                    <Link
                                     to={`/Player/${region}/${matchData ? matchData.info.participants[0].riotIdGameName :"" }/${matchData ? matchData.info.participants[0].riotIdTagline :"" }`}>
                                         <p>{truncateString(matchData ? matchData.info.participants[0].riotIdGameName : "", 7)}</p>
                                    </Link>
                                </p>
                            </div>  
                            <div className="playerTwo">
                                <img src={`https://localhost/champion/${matchData ? matchData.info.participants[1].championName: ""}.png`} alt="player2"></img>
                                <p>
                                    <Link
                                        to={`/Player/${region}/${matchData ? matchData.info.participants[1].riotIdGameName :"" }/${matchData ? matchData.info.participants[1].riotIdTagline :"" }`}>
                                            <p>{truncateString(matchData ? matchData.info.participants[1].riotIdGameName : "", 7)}</p>
                                    </Link>
                                </p>
                            </div>
                            <div className="playerThree">
                                <img src={`https://localhost/champion/${matchData ? matchData.info.participants[2].championName: ""}.png`}alt="player3"></img>
                                <p>
                                    <Link
                                        to={`/Player/${region}/${matchData ? matchData.info.participants[2].riotIdGameName :"" }/${matchData ? matchData.info.participants[2].riotIdTagline :"" }`}>
                                            <p>{truncateString(matchData ? matchData.info.participants[2].riotIdGameName : "", 7)}</p>
                                    </Link></p>
                            </div>
                            <div className="playerFour">
                                <img src={`https://localhost/champion/${matchData ? matchData.info.participants[3].championName: ""}.png`}alt="player4"></img>
                                <p>
                                    <Link
                                        to={`/Player/${region}/${matchData ? matchData.info.participants[3].riotIdGameName :"" }/${matchData ? matchData.info.participants[3].riotIdTagline :"" }`}>
                                            <p>{truncateString(matchData ? matchData.info.participants[3].riotIdGameName : "", 7)}</p>
                                    </Link></p>
                            </div>
                            <div className="playerFive">
                                <img src={`https://localhost/champion/${matchData ? matchData.info.participants[4].championName: ""}.png`}alt="player5"></img>
                                <p>
                                    <Link
                                        to={`/Player/${region}/${matchData ? matchData.info.participants[4].riotIdGameName :"" }/${matchData ? matchData.info.participants[4].riotIdTagline :"" }`}>
                                            <p>{truncateString(matchData ? matchData.info.participants[4].riotIdGameName : "", 7)}</p>
                                    </Link></p>
                            </div>
                        </div>
                        <div className="lastFive">
                            <div className="playerSix">
                                <img src={`https://localhost/champion/${matchData ? matchData.info.participants[5].championName: ""}.png`}alt="player6"></img>
                                <p>
                                    <Link
                                        to={`/Player/${region}/${matchData ? matchData.info.participants[5].riotIdGameName :"" }/${matchData ? matchData.info.participants[5].riotIdTagline :"" }`}>
                                            <p>{truncateString(matchData ? matchData.info.participants[5].riotIdGameName : "", 7)}</p>
                                    </Link></p>
                            </div>
                            <div className="playerSeven">
                                <img src={`https://localhost/champion/${matchData ? matchData.info.participants[6].championName: ""}.png`} alt="player7"></img>
                                <p>
                                    <Link
                                        to={`/Player/${region}/${matchData ? matchData.info.participants[6].riotIdGameName :"" }/${matchData ? matchData.info.participants[6].riotIdTagline :"" }`}>
                                            <p>{truncateString(matchData ? matchData.info.participants[6].riotIdGameName : "", 7)}</p>
                                    </Link></p>
                            </div>
                            <div className="playerEight">
                                <img src={`https://localhost/champion/${matchData ? matchData.info.participants[7].championName: ""}.png`} alt="player8"></img>
                                <p>
                                    <Link
                                        to={`/Player/${region}/${matchData ? matchData.info.participants[7].riotIdGameName :"" }/${matchData ? matchData.info.participants[7].riotIdTagline :"" }`}>
                                            <p>{truncateString(matchData ? matchData.info.participants[7].riotIdGameName : "", 7)}</p>
                                    </Link></p>
                            </div>
                            <div className="playerNine">
                                <img src={`https://localhost/champion/${matchData ? matchData.info.participants[8].championName: ""}.png`} alt="player9"></img>
                                <p>
                                    <Link
                                        to={`/Player/${region}/${matchData ? matchData.info.participants[8].riotIdGameName :"" }/${matchData ? matchData.info.participants[8].riotIdTagline :"" }`}>
                                            <p>{truncateString(matchData ? matchData.info.participants[8].riotIdGameName : "", 7)}</p>
                                    </Link></p>
                            </div>
                            <div className="playerTen">
                                <img src={`https://localhost/champion/${matchData ? matchData.info.participants[9].championName: ""}.png`} alt="player10"></img>
                                <p>
                                    <Link
                                        to={`/Player/${region}/${matchData ? matchData.info.participants[9].riotIdGameName :"" }/${matchData ? matchData.info.participants[9].riotIdTagline :"" }`}>
                                            <p>{truncateString(matchData ? matchData.info.participants[9].riotIdGameName : "", 7)}</p>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="groupThree">
                        <p><Link to={`http://localhost:3000/Match/${MatchID}/${region}/${name}/${tag}`}><i class="arrowDown"></i></Link></p>
                    </div>
                </div>
            )}
        </div>
    );
};
