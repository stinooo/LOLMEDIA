import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import "../css/Matchpage.css";
import { Matchcomp } from './comp/Match/Matchcomp';

const Matchpage: React.FC = () => {
    const { MatchID, server, name, tag } = useParams();
    const [MatchData, setMatchData] = useState<any>(null); // Change the state type to match the data structure

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:7000/get-match?MatchID=${MatchID}&region=${server}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setMatchData(data);
                console.log(data);

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchData();

    }, [MatchID, server]); // Only include MatchID and region in the dependency array

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

            <div className="match-details">
               
            </div>
        </div>
    );
}

export default Matchpage;
