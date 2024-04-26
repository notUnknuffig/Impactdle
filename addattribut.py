import json

with open('data.json', 'r') as file:
    data = json.load(file)

toAdd = input("Key to be added: ")

for key, value in data.items():
    value[toAdd] = input(f"Choose value for '[toAdd]' in '[value['name']]': ")

print(data)

with open('data.json', 'w') as file:
    file.write(json.dumps(data, indent=4))