let select_ability = null;
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
        opt_name.value = display_name;
        characterList.appendChild(opt_name);
    });
    var type = "";
    if (Math.floor(Math.random()) == 0) type = "skill";
    else type = "ult";
    select_ability = data[characterNames[(Math.floor(Math.random() * characterNames.length))]][type];
    
    const inputField = document.getElementById("input");
    inputField.addEventListener(('input'), function guess(event) {
        /*if (event.type === 'keydown' || event.key === 'Enter') {*/
        let input = inputField.value.toLowerCase();
        if(characterNames.indexOf(input) !== -1) {
            inputField.value = "";
            if(alreadyGuessed.indexOf(input) === -1) {
                const ul = document.getElementById('list');
            }
        }
    });
}