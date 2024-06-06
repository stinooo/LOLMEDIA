#Library import
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import requests
import uvicorn
import json
from credentials import API_KEY
#fastAPI app definition
app= FastAPI()

#setup cors rules
origins = ["http://localhost:3000"] #local development hha funny #origins = ["*"] #deployment code - Replace with domain

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

server_regions = {
    "BR1": "americas",
    "EUN1": "europa",
    "EUW1": "europa",
    "JP1": "asia",
    "KR": "asia",
    "LA1": "americas",
    "LA2": "americas",
    "NA1": "americas",
    "OC1": "sea",
    "PH2": "sea",
    "RU": "europa",
    "SG2": "sea",
    "TH2": "sea",
    "TR1": "europa",
    "TW2": "sea",
    "VN": "sea",
}

@app.get("/get-validuser")
async def getValidUser(name : str, tag : str, region : str):
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

    summonerRQ = requests.get("https://" + region + ".api.riotgames.com/lol/summoner/v4/summoners/by-puuid/"
                              + puuid_data["puuid"] + "?api_key=" + API_KEY)
    if not summonerRQ.status_code == 200:
        return {"success" : "false"}
    summoner_data = summonerRQ.json()
    return summoner_data


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

#Api setup
@app.get("/get-Leaderboard")
async def getLeaderboard(region : str):
    PAGES = "1"
    # Check region
    region = region.lower()
    validRegions = ["br1","eun1","euw1","jp1","kr","la1","la2","na1","oc1","ph2","ru","sg2","th2","tr1","tw2","vn"]
    if region not in validRegions:
        return {"success" : "false"}
    
    # Fetch leaderboard data
    leaderboardRQ = requests.get("https://" + region + ".api.riotgames.com/lol/league-exp/v4/entries/RANKED_SOLO_5x5/CHALLENGER/I?page="
     + PAGES +"&api_key=" + API_KEY)
    if not leaderboardRQ.status_code == 200:
        return {"success" : "false"}
    leaderboard_data = leaderboardRQ.json()
    return leaderboard_data


#Api setup
@app.get("/get-player-from-summernerID ")
async def getStatsAccount(summonerID : str, region : str):
    # Check region
    region = region.lower()
    validRegions = ["br1","eun1","euw1","jp1","kr","la1","la2","na1","oc1","ph2","ru","sg2","th2","tr1","tw2","vn"]
    if region not in validRegions:
        return {"success" : "false"}
    
    # Fetch SummonerId 
    SummonerIdRQ  = requests.get("https://" + region + ".api.riotgames.com/lol/summoner/v4/summoners/"
                                  + summonerID + "?api_key="+ API_KEY)
    if not SummonerIdRQ.status_code == 200:
        return {"success" : "false"}
    SummonerIdDate = SummonerIdRQ.json()

    # Fetch NAME AND TAG
    NameTagRQ = requests.get("https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/"
                              + SummonerIdDate["puuid"] + "?api_key="+ API_KEY)
    if not NameTagRQ.status_code == 200:
        return {"success" : "false"}
    NameTagData = NameTagRQ.json()

    return  NameTagData["gameName"], NameTagData["tagLine"]





#Api setup
@app.get("/get-playerpage")
async def getStatsAccount(name : str, tag : str, region : str):
    # Check region
    region = region.lower()
    validRegions = ["br1","eun1","euw1","jp1","kr","la1","la2","na1","oc1","ph2","ru","sg2","th2","tr1","tw2","vn"]
    if region not in validRegions:
        raise HTTPException(status_code=400)
    
    # Fetch puuid
    puuidRQ = requests.get("https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/"
                           + name + "/" + tag + "?api_key=" + API_KEY)
    if not puuidRQ.status_code == 200:
        raise HTTPException(status_code=puuidRQ.status_code, detail="puuidRQ")
    puuid_data = puuidRQ.json()
    # need to get PUUID out for summoner data
    
    # Fetch summoner data
    summonerRQ = requests.get("https://" + region + ".api.riotgames.com/lol/summoner/v4/summoners/by-puuid/"
                              + puuid_data["puuid"] + "?api_key=" + API_KEY)
    if not summonerRQ.status_code == 200:
        raise HTTPException(status_code=summonerRQ.status_code, detail="summonerRQ")
    summoner_data = summonerRQ.json()
    

    #need to get the id out for ranked stats
    rankedRQ = requests.get("https://" + region + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" 
                            + summoner_data["id"] + "?api_key=" + API_KEY)
    if not rankedRQ.status_code == 200:
        raise HTTPException(status_code=rankedRQ.status_code, detail="RankedRQ")
    ranked_data = rankedRQ.json()

    fake_data_unranked = {
        "queueType": "UNRANKED",
        "tier": "Unranked",
        "rank": "",
        "leaguePoints": "?",
        "wins": "?",
        "losses": "?",
        "veteran": False,
        "inactive": False,
        "freshBlood": False,
        "hotStreak": False
    }

    if not ranked_data or len(ranked_data) == 0:
        ranked_data = [fake_data_unranked.copy(), fake_data_unranked.copy(), fake_data_unranked.copy()]

    while len(ranked_data) < 3:
        ranked_data.append(fake_data_unranked.copy())

    queue_map = {entry["queueType"]: entry for entry in ranked_data}

    ranked_data = [
        queue_map.get("RANKED_FLEX_SR", fake_data_unranked.copy()),
        queue_map.get("RANKED_SOLO_5x5", fake_data_unranked.copy()),
        queue_map.get("RANKED_CHERRY", fake_data_unranked.copy())
    ]



    server = server_regions[region.upper()]

    # Define base URLs for each region
    region_base_urls = {
        "americas": "https://americas.api.riotgames.com",
        "europa": "https://europe.api.riotgames.com",
        "asia": "https://asia.api.riotgames.com",
        "sea": "https://sea.api.riotgames.com"
    }

    # Construct the URL using the chosen region
    puuid = puuid_data["puuid"]
    base_url = region_base_urls[server]
    match_history_url = f"{base_url}/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=100&api_key={API_KEY}"

    # Fetch match history data
    match_history_rq = requests.get(match_history_url)

    match_history_data = match_history_rq.json()
    return [ranked_data, summoner_data, puuid_data, match_history_data]


@app.get("/get-match")
async def getMatchData(MatchID: str, region: str):
    server= server_regions[region.upper()]
    region_base_urls = {
        "americas": "https://americas.api.riotgames.com",
        "europa": "https://europe.api.riotgames.com",
        "asia": "https://asia.api.riotgames.com",
        "sea": "https://sea.api.riotgames.com"
    }
    base_url = region_base_urls[server]
    match_url = f"{base_url}/lol/match/v5/matches/{MatchID}?api_key={API_KEY}"

    match_rq = requests.get(match_url)

    match_data = match_rq.json()
    return match_data


@app.get("/get-Top3mastary")
async def getTop3Mastary(puuid : str, region : str):
    # Check region
    region = region.lower()
    validRegions = ["br1","eun1","euw1","jp1","kr","la1","la2","na1","oc1","ph2","ru","sg2","th2","tr1","tw2","vn"]
    if region not in validRegions:
        return {"success" : "false"}
    
    # Fetch puuid
    Mastery = requests.get("https://" + region +".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/" + puuid + "/top?count=3&api_key=" + API_KEY)
    if not Mastery.status_code == 200:
        return {"success" : "false"}
    Mastery_data = Mastery.json()
    return Mastery_data

@app.get("/get-Masterychampions")
async def getMasteryChampions(name : str, tag :str, region : str):
    
    # Check region
    region = region.lower()
    validRegions = ["br1","eun1","euw1","jp1","kr","la1","la2","na1","oc1","ph2","ru","sg2","th2","tr1","tw2","vn"]
    if region not in validRegions:
        return {"success" : "false"}
    
    puuidRQ = requests.get("https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/"
                           + name + "/" + tag + "?api_key=" + API_KEY)
    if not puuidRQ.status_code == 200:
        return {"success" : "false"}
    puuid_data = puuidRQ.json()
    # Fetch data
    Mastery = requests.get("https://" + region +".api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/" + puuid_data["puuid"] + "?api_key=" + API_KEY)
    if not Mastery.status_code == 200:
        return {"success" : "false"}
    Mastery_data = Mastery.json()
    return Mastery_data

@app.get("/get-player-name-leaderboard")
async def getPlayerNameLeaderboard(region : str , summonerID : str):
    region = region.lower()
    validRegions = ["br1","eun1","euw1","jp1","kr","la1","la2","na1","oc1","ph2","ru","sg2","th2","tr1","tw2","vn"]
    if region not in validRegions:
        return {"success" : "false"}
    
    # Fetch leaderboard data
    leaderboardRQ = requests.get("https://" + region + ".api.riotgames.com/lol/summoner/v4/summoners/" + summonerID + "?api_key=" + API_KEY)
    if not leaderboardRQ.status_code == 200:
        return {"success" : "false"}
    leaderboard_data = leaderboardRQ.json()
    #fetch player name
    playername = requests.get("https://europe.api.riotgames.com/riot/account/v1/accounts/by-puuid/" + leaderboard_data["puuid"] + "?api_key=" + API_KEY)
    playername_data = playername.json()

    return playername_data

@app.get("/get-history")
async def getHistory(name : str, tag :str, region : str):
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

    server = server_regions[region.upper()]

    # Define base URLs for each region
    region_base_urls = {
        "americas": "https://americas.api.riotgames.com",
        "europa": "https://europe.api.riotgames.com",
        "asia": "https://asia.api.riotgames.com",
        "sea": "https://sea.api.riotgames.com"
    }

    # Construct the URL using the chosen region
    base_url = region_base_urls[server]
    match_history_url = base_url + "/lol/match/v5/matches/by-puuid/" + puuid_data["puuid"] + "/ids?start=0&count=100&api_key=" + API_KEY

    match_history_rq = requests.get(match_history_url)

    match_history_data = match_history_rq.json()
    return match_history_data



@app.get("/get-test")
async def getTest(puuid : str, region : str):
    #need to get the id out for ranked stats
    rankedRQ = requests.get("https://" + region + ".api.riotgames.com/lol/league/v4/entries/by-summoner/" 
                            + puuid + "?api_key=" + API_KEY)
    if not rankedRQ.status_code == 200:
        raise HTTPException(status_code=rankedRQ.status_code, detail="RankedRQ")
    ranked_data = rankedRQ.json()
    return ranked_data

    






if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=7000, log_level="info") #local development
 

