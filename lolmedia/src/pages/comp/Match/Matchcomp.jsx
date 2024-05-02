import React from "react";
import "./Matchcomp.css";

export const Matchcomp = ({ index, matchData}) => {


    const rightplayer = index;
    const unKDA = matchData?.info.participants[rightplayer]?.challenges.kda ?? "";
    const KDA = Math.round(unKDA * 100) / 100;
    return (
        <div className="match">

            <div className="players">
                <div className="iconSpells">
                        <img className="characterIcon" src={`https://localhost/champion/${matchData ? matchData?.info.participants[rightplayer]?.championName: ""}.png`} alt="champIcon" />
                        <div className="spells">
                            <img src={`https://localhost/Spels/${matchData ? matchData?.info.participants[rightplayer]?.summoner1Id: ""}.png`} alt="" />
                            <img src={`https://localhost/Spels/${matchData ? matchData?.info.participants[rightplayer]?.summoner2Id: ""}.png`} alt="" />
                        </div>
                        <div className="level">LEVEL {matchData ? matchData?.info.participants[rightplayer]?.champLevel: ""}</div>
                        <div className="level">Vision Score {matchData ? matchData?.info.participants[rightplayer]?.visionScore: ""}</div>
                        <div className="playerStats">
                            <p>{matchData ? matchData?.info.participants[rightplayer]?.kills: ""} / {matchData ? matchData?.info.participants[rightplayer]?.deaths: ""} / {matchData ? matchData?.info.participants[rightplayer]?.assists: ""}</p>
                            <p> {KDA} KDA</p>

                            <p>{matchData ? matchData?.info.participants[rightplayer]?.totalMinionsKilled: ""} CS</p>
                            <p>{matchData ? matchData?.info.participants[rightplayer]?.totalDamageDealtToChampions: ""} DMG</p>
                        </div>
                    </div> 
                    <div className="playerItems">
                        <img src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item0: "7050"}.png`} alt="" />
                        <img src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item1: "7050"}.png`} alt="" />
                        <img src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item2: "7050"}.png`} alt=""/>
                        <img src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item3: "7050"}.png`} alt="" />
                        <img src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item4: "7050"}.png`} alt="" />
                        <img src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item5: "7050"}.png`} alt="" />
                        <img src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item6: "7050"}.png`} alt= ""/>
                    </div>
            </div>
       </div>
    );
};

export default Matchcomp;