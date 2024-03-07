import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../css/temp.css';

function Temp() {
    const { server, summenerID } = useParams();
    const [playerdata, setPlayerData] = useState<any>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:7000/get-player-from-summernerID ?summonerID=${summenerID}&region=${server}`);
            const data = await response.json();
            setPlayerData(data);
        } catch (error) {
            console.error('Error fetching player data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); 

    useEffect(() => {
        if (playerdata) {
            window.location.href = `/Player/${server}/${playerdata[0]}/${playerdata[1]}`;
        }
    }, [playerdata, server]);

    return (
        <div>
            {playerdata ? playerdata[0] : "Loading..."}
        </div>
    );
}

export default Temp;
