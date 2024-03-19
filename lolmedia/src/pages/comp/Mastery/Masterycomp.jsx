import"./Masterycomp.css";
import React from "react";

export const Masterycomp = ({masteryData}) => {
    console.log(masteryData);
  return (
    <div className="Mastery-comp-alg">
        <div>{masteryData.championName}</div>
        <img src={`https://localhost/champion/${masteryData.championName}.png`} alt="" />
        <p>Points: {masteryData.championPoints.toLocaleString('en-US').replace(/,/g, ' ')}</p>
    
        <div>pogidk wy roken    </div>

    </div>
  );
};
