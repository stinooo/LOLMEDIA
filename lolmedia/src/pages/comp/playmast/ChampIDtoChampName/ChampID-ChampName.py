import json

# Load champion data from the JSON file with explicit encoding specification
with open("champion.json", "r", encoding="utf-8") as file:
    champion_data = json.load(file)

# Create a dictionary to store champion names with keys
champion_name_key_map = {}

# Extract the champion names and keys and store them in the dictionary
for champion_name, champion_info in champion_data["data"].items():
    champion_key = champion_info["key"]
    champion_name_key_map[champion_key] = champion_name

# Print the champion name based on the key
for key, name in champion_name_key_map.items():
    print(f"Champion Key: {key}, Champion Name: {name}")

# Write the dictionary to a JSON file
with open("champion_name_key_map.json", "w", encoding="utf-8") as outfile:
    json.dump(champion_name_key_map, outfile, indent=4)

print("Champion name and key mapping has been written to 'champion_name_key_map.json'")
