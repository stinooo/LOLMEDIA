import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { Grafe } from './comp/Grafe/grafe';
import { Matchcomp } from './comp/Match/Matchcomp';
import "../css/Matchpage.css";

const Matchpage: React.FC = () => {
    const { MatchID, server, name, tag } = useParams();
    const [matchData, setmatchData] = useState<any>(null);
    const [matchhistory, setmatchhistory] = useState<any>(null);
    const [willbeshow, setWillBeShow] = useState<string>("totalDamageDealtToChampions");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const matchResponse = await fetch(`http://127.0.0.1:7000/get-match?MatchID=${MatchID}&region=${server}`);
                if (!matchResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const matchData = await matchResponse.json();
                setmatchData(matchData);
                console.log(MatchID);

                const matchhistoryResponse = await fetch(`http://127.0.0.1:7000/get-history?name=${name}&tag=${tag}&region=${server}`);
                if (!matchhistoryResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const matchhistory = await matchhistoryResponse.json();
                setmatchhistory(matchhistory);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchData();
    }, [MatchID, server, name, tag]);

    const repeatArray = Array.from({ length: 10 });

    //GAMEINFO
    const gameDurationSeconds = matchData ? matchData.info.gameDuration : "";
    const minutes = Math.floor(gameDurationSeconds / 60);
    const seconds = gameDurationSeconds % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    const formattedDuration = `${formattedMinutes}:${formattedSeconds}`;

    const currentTimestamp = Date.now();
    const providedTimestamp = matchData ? matchData.info.gameEndTimestamp : "";
    const difference = currentTimestamp - providedTimestamp;
    const differenceInSeconds = difference / 1000;
    const differenceInMinutes = differenceInSeconds / 60;
    const differenceInHours = differenceInMinutes / 60;
    const differenceInDays = differenceInHours / 24;
    let timeElapsed;
    if (differenceInDays >= 1) {
        if (differenceInDays <= 1.5) {
            timeElapsed = '1 day ago';
        } else {
            timeElapsed = `${Math.floor(differenceInDays)} days ago`;
        }
    } else if (differenceInHours >= 1) {
        const hours = Math.floor(differenceInHours);
        timeElapsed = `${hours} Hours ago`;
    } else {
        const minutes = Math.round(differenceInMinutes);
        timeElapsed = `${minutes} minutes ago`;
    }
    const gameCreationTimestamp = matchData ? matchData.info.gameCreation : "" // Assuming 0 if matchData is not available
    const gameStartDate = new Date(gameCreationTimestamp);

    // Format the date and time
    const gameDate = gameStartDate.toLocaleDateString(); // Format: MM/DD/YYYY
    const gameTime = gameStartDate.toLocaleTimeString(); // Format: HH:MM:SS

    let matchcounter = matchhistory?.indexOf(MatchID);
    const nextmatch = matchhistory ? matchhistory[matchcounter + 1] : "";
    let previousmatch = matchhistory ? matchhistory[matchcounter - 1] : "";
    if (matchcounter === 0) {
        previousmatch = matchhistory ? matchhistory[matchcounter] : "";
    }

    const handleOptionSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setWillBeShow(event.target.value);
    };

    return (
        <div>
            <div className="navbar">
                <h1><Link className='lol-topleft' to="/">LOLMedia</Link></h1>
                <nav>
                    <ul>
                        <li><Link to="/leaderboard">Leaderboard</Link></li>
                        <li><Link to="/Player/euw1/thomasoke/EUW">Players</Link></li>
                        <li><Link to="#">Stats</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="matchPage">
                <div className="backButtonMatch">
                    <Link className="backButtonLink" to={`/Player/${server}/${name}/${tag}`}>&lt; Go Back</Link>
                    <Link className="backButtonLink" to={`http://localhost:3000/Match/${previousmatch}/${server}/${name}/${tag}`}>previous match</Link>
                    <Link className="backButtonLink" to={`http://localhost:3000/Match/${nextmatch}/${server}/${name}/${tag}`}>next match</Link>
                </div>
                <div className="matchStart">
                    <div className="matchHeader">
                        <div className="leftTeamStats">
                            <p>Dragons: {matchData ? matchData.info.teams[0].objectives.dragon?.kills : ""}</p>
                            <p>Barons: {matchData ? matchData.info.teams[0].objectives.baron?.kills : ""}</p>
                            <p>Towers destroyed: {matchData ? matchData.info.teams[0].objectives.tower?.kills : ""}</p>
                            <h1>{matchData && matchData.info.participants[0].win ? <h1 className="winLossMatch">WIN</h1> : <h1 className="winLossMatch">LOSS</h1>}</h1>
                        </div>
                        <div className="generalGameData">
                            <div className="gameTimeDataMatch">
                                <p className="gameData">{gameDate}</p>
                                <p className="gameTime">{gameTime}</p>
                            </div>
                            <h2>Server: {server}</h2>
                            <p>Duration {formattedDuration}</p>
                            <p>{timeElapsed}</p>
                        </div>
                        <div className="rightTeamStats">
                            <p>Dragons: {matchData ? matchData.info.teams[1].objectives.dragon?.kills : ""}</p>
                            <p>Barons: {matchData ? matchData.info.teams[1].objectives.baron?.kills : ""}</p>
                            <p>Towers destroyed: {matchData ? matchData.info.teams[1].objectives.tower?.kills : ""}</p>
                            <h1>{matchData && matchData.info.participants[9].win ? <h1 className="winLossMatch">WIN</h1> : <h1 className="winLossMatch">LOSS</h1>}</h1>
                        </div>
                    </div>
                    <div className="playerDataMatch">
                        <div className="match-details">
                            <div className="left-columnMatch">
                                {repeatArray.slice(0, 5).map((_, index) => (
                                    <Matchcomp key={index} index={index} matchData={matchData} server={server} tag={tag} name={name} />
                                ))}
                            </div>
                            <div className="right-columnMatch">
                                {repeatArray.slice(5).map((_, index) => (
                                    <Matchcomp key={index} index={index + 5} matchData={matchData} server={server} tag={tag} name={name} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="graphDrop">
                <form method="post">
                    <label className="dropDownLabel" htmlFor="DATA">Choose an option:</label>
                    <select className="drop" name="DATA" id="Datalist" value={willbeshow} onChange={handleOptionSelect}>
                        <option value="totalDamageDealtToChampions">Damage</option>
                        <option value="totalDamageTaken">Tanked</option>
                        <option value="totalHeal">Healed</option>
                        <option value="goldEarned">Gold</option>
                    </select>
                </form>
            </div>

            <div className="grafe">
                <Grafe key={willbeshow} matchData={matchData} shows={willbeshow} />
            </div>
            <div className="match-details">
            </div>
            <div>

            </div>


        </div>
    );
}

export default Matchpage;
