import json
# Load the summoner.json data
with open("summoner.json", 'r',encoding="utf-8") as f:
    summoner_data = json.load(f)

# Extract summoner spell IDs
summoner_spell_ids = []
for spell_id, spell_data in summoner_data['data'].items():
    summoner_spell_ids.append(spell_id)

# Print the summoner spell IDs
print("Summoner Spell IDs:")
print(summoner_spell_ids)