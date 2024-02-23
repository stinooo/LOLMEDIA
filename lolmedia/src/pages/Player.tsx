import React from "react";
import '../css/playerpage.css';
import { Link, useParams } from 'react-router-dom';

function Player() {
  const { server,name,tag } = useParams();
  
  
  return (
    <div>
        <div className="navbar">
            <h1>League of Legends</h1>
            <nav>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/Esports">Esports</Link></li>
                  <li><Link to="/Player">Players</Link></li>
                  <li><Link to="#">Stats</Link></li>
                </ul>
            </nav>
        </div>
        <div className="player">
            <div className="playerContent">
                <h1> server:{server}</h1>
                <h1> name:{name}</h1>
                <h1> tag:{tag}</h1>
                

                <p>Player inhoud en styling komt hieronder wooo</p>
            </div>
        </div>  
    </div>
  );
}

export default Player;  
