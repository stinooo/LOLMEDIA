import React from 'react';
import '../css/homepage.css';
import { SearchBar } from '../searchbar/searchBar.jsx';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div>
      <div className="navbar">
              <h1><Link className='lol-topleft' to="/">League Of Legends</Link></h1>
              <nav>
                  <ul>
                    <li></li>
                    <li><Link to="/Esports">Esports</Link></li>
                    <li><Link to="/Player/euw1/pugo/hihih">Players</Link></li>
                    <li><Link to="#">Stats</Link></li>
                  </ul>
              </nav>
          </div>
          <div className="main">
              <img className="img2" src="../homePageImg.png" alt=""/>
              <div className="content">
                  <h1>LOLMEDIA</h1>
                  <p>Search User:</p>
                  <br></br>
                  <SearchBar/>
                  <div>searchResult</div>
              </div>
          </div>
    </div>
  );
}

export default App;