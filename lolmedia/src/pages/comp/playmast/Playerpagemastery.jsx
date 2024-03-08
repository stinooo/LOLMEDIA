import React, { useState, useEffect } from "react";
import "./Playerpagemastery.css";

export const Mastery = ({ puuid, region }) => {
    const [masteryData, setMasteryData] = useState([]);

    useEffect(() => {
        const fetchMasteryData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:7000/get-Top3mastary?puuid=${puuid}&region=${region}`);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data = await response.json();
                console.log(data);
                setMasteryData(data);
            } catch (error) {
                console.error("Error fetching mastery data:", error);
            }
        };

        fetchMasteryData();
    }, [puuid, region]);

    return (
        <div className="mastery-container">
            <div className="mastery-info">
                <p>Champion ID: {masteryData[0]?.championId}</p>
                <p>Masterypoints: {masteryData[0]?.championPoints}</p>
            </div>
            <div className="mastery-info">
                <p>Champion ID: {masteryData[1]?.championId}</p>
                <p>Masterypoints: {masteryData[1]?.championPoints}</p>
            </div>
            <div className="mastery-info">
                <p>Champion ID: {masteryData[2]?.championId}</p>
                <p>Masterypoints: {masteryData[2]?.championPoints}</p>
            </div>
        </div>
    );
};
