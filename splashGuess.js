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
        opt_name.id = display_name;
        characterList.appendChild(opt_name);
    });
    
    select_character = data[characterNames[(Math.floor(Math.random() * characterNames.length))]];

    const splash = document.getElementById('splash-image');
    splash.style.backgroundImage = "url('Splasharts/"+select_character["name"].replace(/ /g, "_")+".png')";
    splash.style.setProperty('--x-pos', Math.floor(Math.random()*20)+40);
    splash.style.setProperty('--y-pos', Math.floor(Math.random()*70)+20);
    splash.style.setProperty('--img-scale', 20);

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
                    atempts += 1;
                    if(atempts < 20) splash.style.setProperty('--img-scale', 20 - atempts);
                    ul.appendChild(li);
                    if (data[input]["name"] == select_character["name"]) {
                        inputField.placeholder = "You Won!";
                        splash.style.setProperty('--img-scale', 1);
                        splash.style.setProperty('--x-pos', 50);
                        splash.style.setProperty('--y-pos', 50);
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