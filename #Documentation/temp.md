https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/pugo/hihih?api_key=RGAPI-36c4fc39-5633-4afc-805f-9fb11719a7c8

```py
summoner_name = "pugo"
#    summoner_tag = "hihih"
#    url = "https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" + summoner_name + "/" + summoner_tag+"?api_key="
#    urlkey ="RGAPI-36c4fc39-5633-4afc-805f-9fb11719a7c8"
#    r = requests.get(url+urlkey)
#    return Response(content=r.json, media_type="application/json; charset=utf-8")
```
Temp code

Voorbeeld backend
```py
@app.get("/get-killcount/{gameName}/{tagLine}")
async def getkills(gamename : str, tagline : str):
    puuid = requests.get("https://europe.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" + \
                         gamename +"/" + tagline + "?api_key=" + API_KEY).json()["puuid"]
    killcount = requests.get("https://europe.api.riotgames.com/riot/killcount/" + puuid + "?api_key=" + API_KEY).json()
    return killcount
```