let select_character = null;
let alreadyGuessed = [];
let atempts = 0;
try {
    data = JSON.parse(data);
} catch {
    const characterNames = Object.keys(data);
    const characterList = document.getElementById("characters");
    characterNames.sort().forEach(char_name => {
        var opt_name = document.createElement("option");
        display_name = data[char_name]["name"];
        opt_name.value = display_name;
        opt_name.id = charDataName(display_name);
        characterList.appendChild(opt_name);
    });
    
    select_character = data[characterNames[(Math.floor(Math.random() * characterNames.length))]];

    const inputField = document.getElementById("input");
    inputField.addEventListener(('input'), function guess(event) {
        /*if (event.type === 'keydown' || event.key === 'Enter') {*/
            let input = charDataName(inputField.value.toLowerCase());
            if(characterNames.indexOf(input) !== -1) {
                const ul = document.getElementById('list');
                inputField.value = "";
                if(alreadyGuessed.indexOf(input) === -1) {
                    alreadyGuessed.push(input);
                    document.getElementById(charDataName(data[input]["name"])).remove();
                    var li = document.createElement("li");
                    li.setAttribute("class", "grid");
    
                    let name = document.createElement("p");
                    name.appendChild(document.createTextNode(data[input]["name"]));
                    if(data[input]["name"] == select_character["name"]) {
                        name.setAttribute("class", "grid-item correct");            
                    }
                    else {
                        name.setAttribute("class", "grid-item incorrect");
                    }
                    li.appendChild(name)
    
                    var img = document.createElement("img");
                    if(data[input]["name"] == select_character["name"]) {
                        img.setAttribute("class", "grid-item correct");            
                    }
                    else {
                        img.setAttribute("class", "grid-item incorrect"); 
                    }
                    let img_name = charDataName(data[input]["name"]);
                    img.src = "Icons/" + img_name + ".png";
                    li.appendChild(img)
    
                    var gender = document.createElement("p");
                    gender.appendChild(document.createTextNode(data[input]["gender"]));
                    if(data[input]["gender"] == select_character["gender"]) {
                        gender.setAttribute("class", "grid-item correct");            
                    }
                    else {
                        gender.setAttribute("class", "grid-item incorrect");
                    }
                    li.appendChild(gender)

                    var element = document.createElement("img");
                    if(data[input]["element"] == select_character["element"]) {
                        element.setAttribute("class", "grid-item correct");            
                    }
                    else {
                        element.setAttribute("class", "grid-item incorrect"); 
                    }
                    element.src = "misc/" +  data[input]["element"] + ".png";
                    li.appendChild(element)
    
                    var path = document.createElement("img");
                    if(data[input]["path"] == select_character["path"]) {
                        path.setAttribute("class", "grid-item correct");            
                    }
                    else {
                        path.setAttribute("class", "grid-item incorrect"); 
                    }
                    path.src = "misc/" +  data[input]["path"] + ".png";
                    li.appendChild(path)
    
                    var rarity = document.createElement("img");
                    rarity.src = "misc/" +  data[input]["rarity"] + ".png";
                    if(data[input]["rarity"] == select_character["rarity"]) {
                        rarity.setAttribute("class", "grid-item correct");            
                    }
                    else {
                        rarity.setAttribute("class", "grid-item incorrect"); 
                    }
                    li.appendChild(rarity)

                    var version = document.createElement("p");
                    version.appendChild(document.createTextNode(data[input]["release"]));
                    if(data[input]["release"] == select_character["release"]) {
                        version.setAttribute("class", "grid-item correct");            
                    }
                    else {
                        version.setAttribute("class", "grid-item incorrect"); 
                    }
                    li.appendChild(version)

                    atempts += 1;
                    ul.appendChild(li);
                    li.scrollIntoView();
                    if (data[input]["name"] == select_character["name"]) {
                        inputField.placeholder = "You Won!";
                        streak = parseInt(localStorage.getItem("char_streak"))
                        localStorage.setItem("char_streak", streak + 1)
                        l_atempts = parseInt(localStorage.getItem("total_char_atempts"))
                        localStorage.setItem("total_char_atempts", l_atempts + atempts)
                        const d = new Date()
                        localStorage.setItem("char_last_date_atempted", d.getDate())
                        return inputField.removeEventListener('input', guess);
                    }
                    inputField.placeholder = "Enter Character Name";
                }
                else {
                    inputField.placeholder = "Character Already Guessed!";
                }
            }
        /*}*/
    });
}

function charDataName(display_name) {
    display_name = display_name.toLowerCase()
    display_name = display_name.replace(".", "")
    display_name = display_name.replace("• ", "")
    display_name = display_name.replace(/ /g, "_")
    return display_name;
}