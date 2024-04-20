import json
#import requests
import os

def getImages(data):
    for item in data:
        characterName = data[item]["name"].replace(' ', '_')
        url = "https://cdn.wanderer.moe/genshin-impact/character-icons/ui-avataricon-" + item + ".png"
        print(url)
        try:
            img_data = requests.get(url)
            #print(img_data)
            with open('newAvatars/'+ characterName +'.png', 'wb') as handler:
                handler.write(img_data.content)
                print("file: " + 'newAvatars/'+ characterName +'.png succesful!')
        except Exception as e:
            print(e)
    _img_data = requests.get("https://cdn.wanderer.moe/genshin-impact/character-icons/ui-avataricon-razor.png")
    print(_img_data.content)

def addItemToDict(data):
    for item in data:
            print(item)
            data[item]["skill"] = ""
            data[item]["ult"] = ""
            
    try:
        with open('newData.json', 'w') as file:
            file.write(json.dumps(data, indent=4))
    except Exception as e:
        print(e)
    finally:
        print("Finished!")

def skillItemToDict(data):
    os.chdir(r"C:\Users\User\Downloads\AbilityIcons")
    for item in os.listdir(r"C:\Users\User\Downloads\AbilityIcons"):
        _item = item
        item = item.replace("'", "")
        item = item.replace("%2C", "")
        item = item.replace("%3F", "")
        print(item)
        os.rename(_item, item)
        #character = ""
        #type = ""
        #while not character in data:
        #    if character != "":
        #        print("Character not Found.")
        #    character = input("Input Character Name: ")
        #type = input("Input Ability Type: ")
        #data[character][type] = item  
    #try:
    #    with open('newData.json', 'w') as file:
    #        file.write(json.dumps(data, indent=4))
    #except Exception as e:
    #    print(e)
    #finally:
    #    print("Finished!")


if __name__ == '__main__':
    data = {}
    try:
        with open('newData.json', 'r') as file:
            data = json.load(file)
    except Exception as e:
        print(e)
    skillItemToDict(data)
    