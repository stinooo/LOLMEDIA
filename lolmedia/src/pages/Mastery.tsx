import '../css/Masterypage.css';
import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { Masterycomp } from './comp/Mastery/Masterycomp';

function Masterypage() {
    const { server, name, tag } = useParams();
    const [masteryData, setMasteryData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:7000/get-Masterychampions?name=${name}&tag=${tag}&region=${server}`);
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            if (data.success) {
                setMasteryData(data); 
            }
            console.log("UseEffect done");
            console.log(data);
            
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };
    
    useEffect(() => {
        fetchData();
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
                {masteryData.map((masteryData, index) => (
                <Masterycomp key={index} masteryData={masteryData} />
                ))}
            </div>
        </div>
    );
}

export default Masterypage;
