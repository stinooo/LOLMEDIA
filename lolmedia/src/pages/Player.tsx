import React from "react";
import '../css/playerpage.css';
import { Link } from 'react-router-dom';

function Player() {
  return (
    <div>
        <div className="navbar">
            <h1>League of Legends</h1>
            <nav>
                <ul>
                  <li><a href="/">Home</a></li>
                  <li><a href="./Esports">Esports</a></li>
                  <li><a href="./Player">Players</a></li>
                  <li><a href="#">Stats</a></li>
                </ul>
            </nav>
        </div>
        <div className="player">
            <div className="playerContent">
                <p>Player inhoud en styling komt hieronder wooo</p>
            </div>
        </div>
    </div>

  );
}

export default Player;
