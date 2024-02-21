import React from 'react';
import '../homepage.css';


function App() {
  return (
    <div>
      <div className="navbar">
              <h1>League Of Legends</h1>

              <nav>
                  <ul>
                      <li><a href="/">Home</a></li>
                      <li><a href="./Esports">Esports</a></li>
                      <li><a href="./Player">Players</a></li>
                      <li><a href="#">Stats</a></li>
                  </ul>
              </nav>
          </div>
          <div className="main">
              <img className="img2" src="../homePageImg.png" alt=""/>
              <div className="content">
                  <h1>LOLMEDIA</h1>
                  <p>Search User:</p>
                  <br></br>
                  <input type="search" placeholder='Search' />
              </div>
          </div>
    </div>
  );
}

export default App;