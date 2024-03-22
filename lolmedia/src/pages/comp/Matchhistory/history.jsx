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
                        </div>
                        <div className="iconSpells">
                            <img className="characterIcon" src="https://localhost/champion/Aatrox.png" alt="champIcon" />
                            <div className="spells">
                                <img src="https://localhost/Spels/SummonerFlash.png" alt="spell1" />
                                <img src="https://localhost/Spels/SummonerHaste.png" alt="spell2" />
                            </div>
                            <div>
                                <p>KDA</p>
                                <p>CS</p>
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
                            <p>player 1</p>
                            <p>player 2</p>
                            <p>player 3</p>
                            <p>player 4</p>
                            <p>player 5</p>
                        </div>
                        <div className="lastFive">
                            <p>player 6</p>
                            <p>player 7</p>
                            <p>player 8</p>
                            <p>player 9</p>
                            <p>player 10</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
