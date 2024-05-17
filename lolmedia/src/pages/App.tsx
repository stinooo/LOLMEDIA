import React from 'react';
import '../css/homepage.css';
import { Link } from 'react-router-dom';
import {SearchBar} from "./comp/searchbar/searchBar";

function App() {
  return (
    <div>
      <div className="navbar">
              <h1><Link className='lol-topleft' to="/">LOLMedia</Link></h1>
              <nav>
                  <ul>
                    <li></li>
                    <li><Link to="/Leaderboard">Leaderboard</Link></li>
                    <li><Link to="/Player/euw1/pugo/hihih">Players</Link></li>
                  </ul>
              </nav>
          </div>
          <div className="main">
              <img className="img2" src="../homePageImg.png" alt=""/>
              <div className="content">
                  <h1>LOLMEDIA</h1>
                  <p className='searchPlayerHome'>Search User:</p>
                  <div className="searchBar">
                    <SearchBar/>
                  </div>
              </div>
          </div>
    </div>
  );
}

export default App;