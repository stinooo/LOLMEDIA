import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../css/temp.css';

function Temp() {
    const { server, summenerID } = useParams();
    const [ setPlayerData] = useState<any>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:7000/get-player-from-summernerID ?summonerID=${summenerID}&region=${server}`);
            const data = await response.json();
            setPlayerData(data);
            window.location.href = `/Player/${server}/${data[0]}/${data[1]}`;
        } catch (error) {
            console.error('Error fetching player data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); 

    return (
        <div>
            hello 
        </div>
    );
}

export default Temp;
