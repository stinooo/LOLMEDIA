#Library import
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import uvicorn
import json
from credentials import API_KEY

#fastAPI app definition
app = FastAPI()

#setup cors rules
origins = ["http://localhost:3000"] #local development hha funny #origins = ["*"] #deployment code - Replace with domain

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#Api setup
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


@app.get("/get-playerpage")
async def getStatsAccount(name : str, tag : str, region : str):
    # Check region
    region = region.lower()
    validRegions = ["br1","eun1","euw1","jp1","kr","la1","la2","na1","oc1","ph2","ru","sg2","th2","tr1","tw2","vn"]
    if region not in validRegions:
        return {"success" : "false"}
    
    # Fetch puuid
    puuidRQ = requests.get("https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/"
                           + name + "/" + tag + "?api_key=" + API_KEY)
    if not puuidRQ.status_code == 200:
        raise HTTPException(status_code=puuidRQ.status_code)
    puuid_data = puuidRQ.json()
    # need to get PUUID out for summoner data
    
    # Fetch summoner data
    summonerRQ = requests.get("https://" + region + ".api.riotgames.com/lol/summoner/v4/summoners/by-puuid/"
                              + puuid_data["puuid"] + "?api_key=" + API_KEY)
    if not summonerRQ.status_code == 200:
        return {"success" : "false"}
    summoner_data = summonerRQ.json()
  

    # combined_data = {**puuid_data, **summoner_data}
    #need to get the id out for ranked stats
    rankedRQ = requests.get('https://' + region + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" 
                            + "K86YtNrfF8GXSNND0c-LdvmJCfs9dbigBigb0KzfyyhIOSIY" + "?api_key=" + API_KEY)
    if not rankedRQ.status_code == 200:
        return {"success" : "false"}
    ranked_data = rankedRQ.json()

    return [ranked_data, summoner_data]




@app.get("/getAccountStats")
async def getStatsAccount(name : str, tag : str, region : str):
    #Check region
    region = region.lower()
    validRegions = ["br1","eun1","euw1","jp1","kr","la1","la2","na1","oc1","ph2","ru","sg2","th2","tr1","tw2","vn"]
    if region not in validRegions:
        return {"success" : "false"}

    #Get PUUID from Account-V1
    puuidRQ = requests.get("https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/"
                           +name+"/" + tag + "?api_key="+ API_KEY)
    if not puuidRQ.status_code == 200:
        return {"success" : "false"}
    puuid = puuidRQ.json()["puuid"]

    #Get SummonerID from SummonerV4
    summonerIdRQ = requests.get("https://" + region + ".api.riotgames.com/lol/summoner/v4/"+
                                "summoners/by-puuid/" + puuid + "?api_key=" + API_KEY)
    if not summonerIdRQ.status_code == 200:
        return {"success" : "false"}
    summonerID = summonerIdRQ.json()["id"]

    #Get account JSON from LeagueV4
    accountDataRQ = requests.get("https://" + region + ".api.riotgames.com/lol/league/v4/entries/by-summoner/"
                                  + summonerID + "?api_key=" + API_KEY)
    if not accountDataRQ.status_code == 200:
        return {"success" : "false"}
    accountDataJson = accountDataRQ.json()

    #Return JSON
    return accountDataJson



    






if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=7000, log_level="info") #local development
 #   uvicorn.run(app, host="0.0.0.0", port=2000) #Run mode

