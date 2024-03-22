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
                    <div className="historyText">
                        <p>Ranked Solo</p>
                        <p>20:15</p>
                    </div>
                    <img className="characterIcon" src="https://localhost/champion/Aatrox.png" alt="" />
                    <div className="spells">
                        <img src="https://localhost/item/1001.png" alt="" />
                        <img src="https://localhost/item/1001.png" alt="" />
                    </div>
                </div>
            )}
        </div>
    );
};
