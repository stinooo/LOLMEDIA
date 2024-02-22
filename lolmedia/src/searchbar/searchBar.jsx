import React,{useState} from "react";
import "./searchBar.css";


export const SearchBar = () => {
    const [input, setinput] = useState("");
    
    const fetchdata = (value) => 
    {
       fetch("http://127.0.0.1:7000/get-puuid?name=" + input + "&tag=hihih").then((Response)=> Response.json())
       .then(json => {console.log(json);})
    }

    const handlechange = (value) => {
        setinput(value);
        fetchdata(value);
    };

    return( <div className="input">
    <input placeholder="type to search" value={input}
     onChange={(e) => handlechange(e.target.value)} />  
    </div>
    );
};