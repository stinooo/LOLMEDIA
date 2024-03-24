import React from "react";
import "./Masterycomp.css";
import championNameKeyMap from "../playmast/ChampIDtoChampName/champion_name_key_map.json"

export const Masterycomp = ({ mastery }) => {
    const championId = mastery.championId;
    const championName = championNameKeyMap[championId];

    return (
        <div className="mastery-comp-alg">
            <p>{championName}</p>
            <img className="img" src={`https://localhost/champion/${championName}.png`} alt={championName} />
            <p>Points: {mastery.championPoints.toLocaleString('en-US').replace(/,/g, ' ')}</p>
        </div>
    );
};

export default Masterycomp;