import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import '../css/playerpage.css';

function Player() {
    const { server, name, tag } = useParams();
    const [playerData, setPlayerData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:7000/geticon?name=${name}&tag=${tag}&region=${server}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlayerData(data);
            } catch (error) {
                console.error('There was a problem with the fetch operation:', error);
            }
        };
        
        fetchData();
    }, [name, tag, server]);

return (
        <div>
            <div className="navbar">
                <h1><Link className='lol-topleft' to="/">League Of Legends</Link></h1>
                <nav>
                    <ul>
                        <li><Link to="/Esports">Esports</Link></li>
                        <li><Link to="/Player/EUW/thomasoke/EUW">Players</Link></li>
                        <li><Link to="#">Stats</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="player">
                <div className="playerInfo">
                    <br></br>
                    <br></br>
                    <p>NAME#TAG</p>
                    <div className="container">
                        <img className="icon" src="/6482.png" alt="icon"></img>
                        <div className="level">99</div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="soloRank">
                        <p className="soloRankName">Ranked Solo</p>
                        <br></br>
                        <div className="soloRankInfo">
                            <img className="soloRankImage" src="/6482.png"></img>
                            <p>Emerald</p>
                            <p>99</p>
                        </div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="flexRank"> 
                        <p className="flexRankName">Ranked Flex</p>
                        <br></br>
                        <div className="flexRankInfo">
                            <img className="flexRankImage" src="/6482.png"></img>
                            <p>Emerald</p>
                            <p>99</p>
                        </div>
                    </div>
                </div>
            </div>  
        </div>)}

export default Player;