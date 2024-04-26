import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './pages/App';
import Player from './pages/Player';
import Leaderboard from './pages/Leaderboard';
import Mastery from './pages/Mastery';
import Matchpage from './pages/Matchpage';


import { BrowserRouter, Route, Routes } from "react-router-dom";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/player/:server/:name/:tag" element={<Player />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/Mastery/:server/:name/:tag" element={<Mastery/>} />
          <Route path="/Match/:Match" element={<Matchpage/>} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
