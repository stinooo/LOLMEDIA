import React from "react";
import "./Masterycomp.css";
import championNameKeyMap from "../playmast/ChampIDtoChampName/champion_name_key_map.json"

export const Masterycomp = ({ mastery }) => {
    const championId = mastery.championId; 
    const championName = championNameKeyMap[championId];

    return (
        <div className="Mastery-comp-alg">
            <div className="champname">{championName}</div>
            <img className="img" src={`https://localhost/champion/${championName}.png`} alt={championName} />
            <div>{mastery.championPoints}</div>
        </div>
    );
};

export default Masterycomp;
