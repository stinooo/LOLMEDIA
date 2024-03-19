import React, { useState, useEffect } from "react";
import "./Playerpagemastery.css";
import championNameKeyMap from './ChampIDtoChampName/champion_name_key_map.json';
import { Link } from 'react-router-dom';


export const Mastery = ({ puuid, region, tag, name }) => {
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
    const championId = masteryData[0]?.championId; 
    const championName = championNameKeyMap[championId];
    const championId1 = masteryData[1]?.championId;
    const championName1 = championNameKeyMap[championId1];
    const championId2 = masteryData[2]?.championId;
    const championName2 = championNameKeyMap[championId2];

    return (
        <div className="mastery-container">
            <div className="mastery-info">
                <div>{championName}</div>
                <img src={`https://localhost/champion/${championName}.png`} alt={championName} />
                <p>Points: {masteryData[0]?.championPoints.toLocaleString('en-US').replace(/,/g, ' ')}</p>

            </div>
            <div className="mastery-info">
                <div>{championName1}</div>
                <img src={`https://localhost/champion/${championName1}.png`} alt={championName1} />                
                <p>Points: {masteryData[1]?.championPoints.toLocaleString('en-US').replace(/,/g, ' ')}</p>
            </div>
            <div className="mastery-info">
                <div>{championName2}</div>
                <img src={`https://localhost/champion/${championName2}.png`} alt={championName2} />
                <p>Points: {masteryData[2]?.championPoints.toLocaleString('en-US').replace(/,/g, ' ')}</p>
            </div>
            <Link to = {`/Mastery/${region}/${name}/${tag}`} className="linkmast">See more..</Link>
        </div>
    );
};
