import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./history.css";


export const History = ({ MatchID ,region, Puuid}) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [matchData, setMatchData] = useState(null);

    useEffect(() => {
        fetchData(MatchID);
    }, [MatchID]);

    const fetchData = (MatchID ) => {
        fetch("http://127.0.0.1:7000/get-match?MatchID=" + MatchID)
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
        return str.length > maxLen ? str.substring(0, maxLen) + ".." : str;
    };
    let x = -1;

    switch (Puuid) {
        case matchData?.metadata.participants[0]:
            x = 0;
            break;
        case matchData?.metadata.participants[1]:
            x = 1;
            break;
        case matchData?.metadata.participants[2]:
            x = 2;
            break;
        case matchData?.metadata.participants[3]:
            x = 3;
            break;
        case matchData?.metadata.participants[4]:
            x = 4;
            break;
        case matchData?.metadata.participants[5]:
            x = 5;
            break;
        case matchData?.metadata.participants[6]:
            x = 6;
            break;
        case matchData?.metadata.participants[7]:
            x = 7;
            break;
        case matchData?.metadata.participants[8]:
            x = 8;
            break;
        case matchData?.metadata.participants[9]:
            x = 9;
            break;
        default:
            x = -1; 
            break;
    }
    
    return (
        <div className="historyMain">
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {matchData && (
                <div className="history-container">
                    <div className="groupOne">
                        <div className="historyText">
                            <p>Ranked Solo</p>
                            <p>20:15</p>
                            <div className="winLoss">
                                <p>Victory</p>
                            </div>
                        </div>
                        <div className="iconSpells">
                            <img className="characterIcon" src={`https://localhost/champion/${matchData ? matchData.info.participants[x].championName: ""}.png`} alt="champIcon" />
                            <div className="spells">
                                <img src="https://localhost/Spels/SummonerFlash.png" alt="spell1" />
                                <img src="https://localhost/Spels/SummonerHaste.png" alt="spell2" />
                            </div>
                            <div className="playerStats">
                                <p>1 / 1 / 1</p>
                                <p>2.0 KDA</p>
                                <p>120 CS</p>
                            </div>
                        </div> 
                        <div className="playerItems">
                            <img src="https://localhost/item/3031.png" alt="item1" />
                            <img src="https://localhost/item/3031.png" alt="item2" />
                            <img src="https://localhost/item/3031.png" alt="item3" />
                            <img src="https://localhost/item/3031.png" alt="item4" />
                            <img src="https://localhost/item/3031.png" alt="item5" />
                            <img src="https://localhost/item/3031.png" alt="item6" />
                            <img src="https://localhost/item/3340.png" alt="ward" />
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
                </div>
            )}
        </div>
    );
};
