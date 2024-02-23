import React, { useState } from "react";
import "./searchBar.css";

export const SearchBar = () => {
    const [input, setInput] = useState("");
    
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const [name, tag] = input.split('#').map(item => item.trim()); // Split input by '#' and trim whitespace
            fetchdata(name, tag);
        }
    };
//http://127.0.0.1:7000/geticon?name=pugo&tag=hihih&region=euw1

    const fetchdata = (name,tag) => {
        fetch("http://127.0.0.1:7000/get-puuid?name=" + name + "&tag="+tag)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((json) => {
                console.log(json);
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    return (
        <div className="input">
            <input 
                placeholder="NAME #TAG" 
                value={input} 
                onChange={handleChange} 
                onKeyPress={handleKeyPress} // Call handleKeyPress on key press
            /> 
        </div>
    );
};
