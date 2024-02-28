import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import '../css/playerpage.css';

function Player() {
    const { server, name, tag } = useParams();
    const [playerData, setPlayerData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:7000/get-playerpage?name=${name}&tag=${tag}&region=${server}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPlayerData(data);
                console.log(data);
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
                        <li><Link to="/Player/euw1/thomasoke/EUW">Players</Link></li>
                        <li><Link to="#">Stats</Link></li>
                    </ul>
                </nav>
            </div>
            <div className="player">
                <div className="playerInfo">
                    <br></br>
                    <br></br>
                    <div className="username">
                        <p className="name">NAME</p>
                        <p className="tag">#TAG</p>
                    </div>
                    <div className="container">
                        <img className="icon" src="/6482.png" alt="icon"></img>
                        <div className="level">100</div>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="rankBackground">
                        <p className="rankName">Ranked Solo</p>
                        <br></br>
                        <img className="rankImage" src="/emerald.png" alt="solo duo rank"></img>
                        <p className="rank">Emerald</p>
                        <p className="LP">99 LP</p>
                    </div>
                    <br></br>
                    <br></br>
                    <div className="rankBackground"> 
                        <p className="rankName">Ranked Flex</p>
                        <br></br>
                        <img className="rankImage" src="/emerald.png" alt="flex rank"></img>
                        <p className="rank">Diamond</p>
                        <p className="LP">12 LP</p>
                    </div>
                </div>
            </div>  
        </div>)}

export default Player;