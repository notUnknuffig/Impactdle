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
        display_name = charNameOptList(data[char_name]["name"]);
        opt_name.value = display_name;
        characterList.appendChild(opt_name);
    });
    
    select_character = data[characterNames[(Math.floor(Math.random() * characterNames.length))]];

    const inputField = document.getElementById("input");
    inputField.addEventListener(('input'), function guess(event) {
        /*if (event.type === 'keydown' || event.key === 'Enter') {*/
            let input = inputField.value.toLowerCase();
            if(characterNames.indexOf(input) !== -1) {
                const ul = document.getElementById('list');
                inputField.value = "";
                if(alreadyGuessed.indexOf(input) === -1) {
                    alreadyGuessed.push(input);
                    document.getElementById(charNameOptList(data[input]["name"])).remove();
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
                    let img_name = data[input]["name"].replace(/ /g, '_');
                    img.src = "Avatars/" + img_name + ".png";
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

                    var vision = document.createElement("img");
                    if(data[input]["vision"] == select_character["vision"]) {
                        vision.setAttribute("class", "grid-item correct");            
                    }
                    else {
                        vision.setAttribute("class", "grid-item incorrect"); 
                    }
                    vision.src = "misc/" +  data[input]["vision"] + ".svg";
                    li.appendChild(vision)
    
                    var weapon = document.createElement("p");
                    weapon.appendChild(document.createTextNode(data[input]["weapon"]));
                    if(data[input]["weapon"] == select_character["weapon"]) {
                        weapon.setAttribute("class", "grid-item correct");            
                    }
                    else {
                        weapon.setAttribute("class", "grid-item incorrect"); 
                    }
                    li.appendChild(weapon)
    
                    var rarity = document.createElement("img");
                    rarity.src = "misc/" +  data[input]["rarity"] + ".png";
                    if(data[input]["rarity"] == select_character["rarity"]) {
                        rarity.setAttribute("class", "grid-item correct");            
                    }
                    else {
                        rarity.setAttribute("class", "grid-item incorrect"); 
                    }
                    li.appendChild(rarity)
    
                    var region = document.createElement("p");
                    region.appendChild(document.createTextNode(data[input]["region"]));
                    if(data[input]["region"] == select_character["region"]) {
                        region.setAttribute("class", "grid-item correct");            
                    }
                    else {
                        region.setAttribute("class", "grid-item incorrect"); 
                    }
                    li.appendChild(region)

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

function charNameOptList(display_name) {
    if(display_name === "Kaedehara Kazuha") {
        display_name = "Kazuha"
    }
    else if(display_name === "Kamisato Ayaka") {
        display_name = "Ayaka"
    }
    else if(display_name === "Kamisato Ayato") {
        display_name = "Ayato"
    }
    else if(display_name === "Sangonomiya Kokomi") {
        display_name = "Kokomi"
    }
    else if(display_name === "Shikanoin Heizou") {
        display_name = "Heizou"
    }
    return display_name;
}