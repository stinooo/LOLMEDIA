import React from 'react';
import '../homepage.css';


function App() {
  return (
    <div>
      <div className="navbar">
              <h1>League Of Legends</h1>

              <nav>
                  <ul>
                      <li><a href="#">Home</a></li>
                      <li><a href="#">Stats</a></li>
                      <li><a href="#">Stats+</a></li>
                      <li><a href="#">Stats premium</a></li>
                  </ul>
              </nav>
          </div>
          <div className="main">
              <img className="img2" src="../homePageImg.png" alt=""/>
              <div className="content">
                  <h2>League <br /><a href="./Esports">Esports</a> <br /><a href="./Player">player</a></h2>
                  <p>League website <br /> ofzo</p>
                  <input type="search" placeholder='search' />
              </div>
          </div>
    </div>
  );
}

export default App;