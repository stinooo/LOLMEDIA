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
                    setErrorMessage("Match not found"); // Set error message if match is not found
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
        <div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {matchData && (
                <div>
                    TEST
                </div>
            )}
        </div>
    );
};
