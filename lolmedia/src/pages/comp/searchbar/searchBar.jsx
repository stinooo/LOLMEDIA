import React, { useState } from "react";
import "./searchBar.css";

export const SearchBar = () => {
    const [input, setInput] = useState("");
    const [server, setServer] = useState("euw1"); // Default server is EUW
    const [errorMessage, setErrorMessage] = useState(""); // State to store error message

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const [name, tag] = input.split('#').map(item => item.trim()); // Split input by '#' and trim whitespace
            fetchData(name, tag, server);
        }
    };
    
    const fetchData = (name, tag, server) => {
        fetch("http://127.0.0.1:7000/get-validuser?name=" + name + "&tag=" + tag + "&region=" + server)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((json) => {
                if (json.success === "false") {
                    setErrorMessage("Player not found"); // Set error message if player is not found
                } else {
                    
                    window.location.href = "http://localhost:3000/Player/"+ server+"/"+name+"/"+tag;
                }
            })
            .catch((error) => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };

    const handleChange = (e) => {
        setInput(e.target.value);
        setErrorMessage(""); // Clear error message when user types in the input field
    };

    const handleServerChange = (e) => {
        setServer(e.target.value);
    };

    return (
        <div className="input">
            <div className="dropbox">
                <form  method="post">
                    <label htmlFor="server"></label>
                    <select className="drop" name="server" id="serverlist" value={server} onChange={handleServerChange}>
                    <option value="euw1">EUW</option>
                        <option value="na1">NA</option>
                        <option value="eun1">EUNE</option>
                        <option value="kr">KR</option>
                        <option value="jp1">JP</option>
                        <option value="br1">BR</option>
                        <option value="la1">LAN</option>
                        <option value="la2">LAS</option>
                        <option value="oc1">OCE</option>
                        <option value="ru">RU</option>
                        <option value="tr1">TR</option>
                    </select>
                </form>
            </div>
            <input 
                placeholder="NAME #TAG" 
                value={input} 
                onChange={handleChange} 
                onKeyPress={handleKeyPress} 
            />
            {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message if it exists */}
        </div>
    );
};
