import React from "react";
import "./Matchcomp.css";
import { Link } from "react-router-dom";

export const Matchcomp = ({ index, matchData, server, tag, name }) => {


    const rightplayer = index;
    const unKDA = matchData?.info.participants[rightplayer]?.challenges.kda ?? "";
    const KDA = Math.round(unKDA * 100) / 100;
    const CS = (matchData?.info.participants[rightplayer]?.totalMinionsKilled ?? 0) + (matchData?.info.participants[rightplayer]?.neutralMinionsKilled ?? 0);

    return (
        <div className="playersMatch">
            <div className="iconSpellsMatch">
                <img className="characterIconMatch" src={`https://localhost/champion/${matchData ? matchData?.info.participants[rightplayer]?.championName : ""}.png`} alt="champIcon" />
                <div className="spellsMatch">
                    <img className="spellMatch" src={`https://localhost/Spels/${matchData ? matchData?.info.participants[rightplayer]?.summoner1Id : ""}.png`} alt="" />
                    <img className="spellMatch" src={`https://localhost/Spels/${matchData ? matchData?.info.participants[rightplayer]?.summoner2Id : ""}.png`} alt="" />
                </div>
                <div className="nameLevelMatch">
                    <div className="playerNameMatch"><Link
                        to={`/Player/${server}/${matchData ? matchData.info.participants[rightplayer].riotIdGameName : ""}/${matchData ? matchData.info.participants[rightplayer].riotIdTagline : ""}`}>
                        <p>{matchData ? matchData.info.participants[rightplayer].riotIdGameName : ""}</p>
                    </Link></div>
                    <div className="levelMatch">LEVEL {matchData ? matchData?.info.participants[rightplayer]?.champLevel : ""}</div>
                </div>
                <div className="kdaMatch">
                    <p>{matchData ? matchData?.info.participants[rightplayer]?.kills : ""} / {matchData ? matchData?.info.participants[rightplayer]?.deaths : ""} / {matchData ? matchData?.info.participants[rightplayer]?.assists : ""}</p>
                    <p> {KDA} KDA</p>
                </div>
                <div className="extraDataPlayerMatch">
                    <div>Vision {matchData ? matchData?.info.participants[rightplayer]?.visionScore : ""}</div>
                    <p>{CS} CS</p>
                    <p>{matchData ? matchData?.info.participants[rightplayer]?.totalDamageDealtToChampions : ""} DMG</p>
                </div>
            </div>
            <div className="playerItemsMatchPage">
                <img className="itemMatch" src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item0 : "7050"}.png`} alt="" />
                <img className="itemMatch" src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item1 : "7050"}.png`} alt="" />
                <img className="itemMatch" src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item2 : "7050"}.png`} alt="" />
                <img className="itemMatch" src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item3 : "7050"}.png`} alt="" />
                <img className="itemMatch" src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item4 : "7050"}.png`} alt="" />
                <img className="itemMatch" src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item5 : "7050"}.png`} alt="" />
                <img className="itemMatch" src={`https://localhost/item/${matchData ? matchData?.info.participants[rightplayer]?.item6 : "7050"}.png`} alt="" />
            </div>
        </div>
    );
};

export default Matchcomp;