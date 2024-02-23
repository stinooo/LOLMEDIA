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
            <div className="playerInfo">
                <br></br>
                <br></br>
                <p>Username#Tag</p>
                <div className="container">
                    <img className="icon" src="../6482.png" alt="icon"></img>
                    <div className="level">399</div>
                </div>
            </div>
        </div>  
    </div>
  );
}

export default Player;  
