# Backend for LOLMEDIA project

## Using

1. Copy `credentials-template.py`
2. Rename the copy to `credentials.py`
3. In this file place the API key 
    * `API_KEY="KEY INSERT"`
    * Insert RIOT dev key instead of `KEY INSERT`
4. Run the `main.py`
    * `python ./main.py`
5. The API will now run at `localhost:7000`
    * Documentation is auto generated at `localhost:7000/docs`

## API FLOW

|DATA IN|DATA OUT|API|
|:--:|:--:|:-|
|Name, Tag|PUUID|[account-v1](https://developer.riotgames.com/apis#account-v1)|
|PUUID, Region|SummonerID|[summoner-v4](https://developer.riotgames.com/apis#summoner-v4)|
|SummonerID, Region|Account stats|[league-v4](https://developer.riotgames.com/apis#league-v4)|


**EXAMPLE DATA**

|Data type|Example|Data type|
|:-:|:-|:-|
|Name|pugo|String|
|Tag|hihih|String|
|PUUID|PMhyPVhwZ...|Json/String|
|SummonerID|K86YtNrfF8GX...|Json/String|
|Account stats|{{...},{...}}|Json|

## Development : Example API endpoint 

* Backend
    ```py
    @app.get("/get-puuid")
    async def getStatsAccount(name : str, tag : str):
        #Get PUUID from Account-V1
        
        puuidRQ = requests.get(
            "https://europe.api.riotgames.com/riot/"
            + "account/v1/accounts/by-riot-id/"
            + name + "/" + tag + "?api_key="+ API_KEY
        )
        
        if not puuidRQ.status_code == 200:
            return {"success" : "false"}
        
        puuidJson = puuidRQ.json()
        return puuidJson
    ```

* Frontend - HTTP Request

    http://localhost:7000/get-puuid?name=pugo&tag=hihih  
    Above URL is an example call for the `get-puuid` endpoint looking for the player `pugo#hihih`
