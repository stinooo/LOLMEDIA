import {useEffect} from "react";

// RGAPI-7e098fd8-48b1-4d96-b11d-aa25c67deb6c

const API_url = "http://127.0.0.1:7000/";
const App = () => {
    const search = async () => {
      const response = await fetch(`${API_url}`);
      const data = await response.json();
      console.log("puuid:", data.puuid);
    }
    useEffect(() => {
      search();
    }, []);
    
    return (
    <div></div>
  );
}

export default App; // need to exaport the App component to be able to import it in other files stinaaaa hey alles goe 
