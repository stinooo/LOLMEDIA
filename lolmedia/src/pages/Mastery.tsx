import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import "../css/Masterypage.css";
import Masterycomp from './comp/Mastery/Masterycomp'; // Import the Masterycomp component

const Masterypage: React.FC = () => {
    const { server, name, tag } = useParams();
    const [masteryData, setMasteryData] = useState<any[]>([]); // Use 'any' type if the structure of the data is not known

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:7000/get-Masterychampions?name=${name}&tag=${tag}&region=${server}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setMasteryData(data);
                console.log(data);

            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };

        fetchData(); // Call fetchData within useEffect

    }, [name, tag, server]);

    return (
        <div>
            <div className="navbar">
                <h1><Link className='lol-topleft' to="/">League Of Legends</Link></h1>
                <nav>
                    <ul>
                        <li><Link to="/leaderboard">Leaderboard</Link></li>
                        <li><Link to="/Player/euw1/thomasoke/EUW">Players</Link></li>
                        <li><Link to="#">Stats</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="Mastery">
                {masteryData.map((mastery) => (
                    <Masterycomp mastery={mastery} />
                ))}
            </div>
        </div>
    );
}

export default Masterypage;
