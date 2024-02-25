import React from 'react';
import '../css/Esportspage.css';
import { Link } from 'react-router-dom';


function Esports() {
  return (
    <div>
        <div className="navbar">
          <h1><Link className='lol-topleft' to="/">League Of Legends</Link></h1>
            <nav>
                <ul>
                  <li><Link to="/Esports">Esports</Link></li>
                  <li><Link to="/Player/EUW1/thomaske/EUW">Players</Link></li>
                  <li><Link to="#">Stats</Link></li>
                </ul>
            </nav>
        </div>
        <div className="player">
            <div className="playerContent">
                <p>ESPORTS</p>
            </div>
        </div>
    </div>
  );
}

export default Esports;