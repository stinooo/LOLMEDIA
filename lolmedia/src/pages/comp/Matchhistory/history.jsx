import React, { useState, useEffect } from "react";
import "./history.css";

export const History = ({ MatchID }) => {
    const [errorMessage, setErrorMessage] = useState("");
    const [matchData, setMatchData] = useState(null);

    useEffect(() => {
        fetchData(MatchID);
    }, [MatchID]);

    const fetchData = (MatchID) => {
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
                            <img className="characterIcon" src="https://localhost/champion/Aatrox.png" alt="champIcon" />
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
                                <img src="https://localhost/champion/Aatrox.png" alt="player1"></img>
                                <p>player 1</p>
                            </div>
                            <div className="playerTwo">
                                <img src="https://localhost/champion/Aatrox.png" alt="player2"></img>
                                <p>player 2</p>
                            </div>
                            <div className="playerThree">
                                <img src="https://localhost/champion/Aatrox.png" alt="player3"></img>
                                <p>player 3</p>
                            </div>
                            <div className="playerFour">
                                <img src="https://localhost/champion/Aatrox.png" alt="player4"></img>
                                <p>player 4</p>
                            </div>
                            <div className="playerFive">
                                <img src="https://localhost/champion/Aatrox.png" alt="player5"></img>
                                <p>player 5</p>
                            </div>
                        </div>
                        <div className="lastFive">
                            <div className="playerSix">
                                <img src="https://localhost/champion/Aatrox.png" alt="player6"></img>
                                <p>player 6</p>
                            </div>
                            <div className="playerSeven">
                                <img src="https://localhost/champion/Aatrox.png" alt="player7"></img>
                                <p>player 7</p>
                            </div>
                            <div className="playerEight">
                                <img src="https://localhost/champion/Aatrox.png" alt="player8"></img>
                                <p>player 8</p>
                            </div>
                            <div className="playerNine">
                                <img src="https://localhost/champion/Aatrox.png" alt="player9"></img>
                                <p>player 9</p>
                            </div>
                            <div className="playerTen">
                                <img src="https://localhost/champion/Aatrox.png" alt="player10"></img>
                                <p>player 10</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
