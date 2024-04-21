let select_ability = null;
let alreadyGuessed = [];
let atempts = 0;

const abilityName = document.getElementById('ability-name')

const element_cd = document.getElementById('element-countdown');
const element_cd_in = document.getElementById('element-countdown-in');
const element = document.getElementById('ability-element');
var element_cd_var = 3;

const img_cd = document.getElementById('img-countdown');
const img_cd_in = document.getElementById('img-countdown-in');
const img = document.getElementById('ability-img');
var img_cd_var = 6;

const button_skill = document.getElementById("button-skill");
const button_ult = document.getElementById("button-ult");
const guessTypeButtons = document.getElementById('guess-type-buttons');

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
        else if(display_name === "Shikanoin Heizou") {
            display_name = "Heizou"
        }
        opt_name.value = display_name;
        characterList.appendChild(opt_name);
    });
    var char = characterNames[(Math.floor(Math.random() * characterNames.length))];
    var type = "";
    if (Math.floor(Math.random() * 2) == 1) type = "skill";
    else type = "ult";
    select_ability = data[char][type];
    abilityName.innerHTML = select_ability;
    
    const inputField = document.getElementById("input");
    inputField.addEventListener(('input'), function guess(event) {
        /*if (event.type === 'keydown' || event.key === 'Enter') {*/
        let input = inputField.value.toLowerCase();
        if(characterNames.indexOf(input) !== -1) {
            inputField.value = "";
            if(alreadyGuessed.indexOf(input) === -1) {
                atempts++;
                element_cd_in.innerHTML = element_cd_var - atempts;
                img_cd_in.innerHTML = img_cd_var - atempts;
                if (element_cd_var - atempts == 0) {
                    element_cd.style.display = 'none'
                    element_url = "misc/"+ data[char]["vision"] +".svg"
                    element.src = element_url
                    element.style.display = 'block'
                }
                else if (img_cd_var - atempts == 0) {
                    img_cd.style.display = 'none'
                    var _abilityName = data[char][type]
                    _abilityName = _abilityName.replace(/'/g, "")
                    _abilityName = _abilityName.replace(/!/g, "")
                    _abilityName = _abilityName.replace(/,/g, "")
                    _abilityName = _abilityName.replace(/ /g, "_")
                    img_url = "Abilitys/"+ _abilityName +".webp"
                    img.src = img_url
                    img.style.display = 'block'
                }

                const ul = document.getElementById('list');
                alreadyGuessed.push(input);
                var li = document.createElement("li");
                li.setAttribute("class", "grid");

                let name = document.createElement("p");
                name.appendChild(document.createTextNode(data[input]["name"]));
                if(data[input]["name"] == data[char]["name"]) {
                    name.setAttribute("class", "grid-item correct");            
                }
                else {
                    name.setAttribute("class", "grid-item incorrect");
                }
                li.appendChild(name)
                ul.appendChild(li);
                li.scrollIntoView();
                if (input == char) {
                    inputField.removeEventListener('input', guess)
                    element_cd.style.display = 'none'
                    element_url = "misc/"+ data[char]["vision"] +".svg"
                    element.src = element_url
                    element.style.display = 'block'
                    img_cd.style.display = 'none'
                    var _abilityName = data[char][type]
                    _abilityName = _abilityName.replace(/'/g, "")
                    _abilityName = _abilityName.replace(/!/g, "")
                    _abilityName = _abilityName.replace(/,/g, "")
                    _abilityName = _abilityName.replace(/ /g, "_")
                    img_url = "Abilitys/"+ _abilityName +".webp"
                    img.src = img_url
                    img.style.display = 'block'
                    guessTypeButtons.style.display = "block"
                    streak = parseInt(localStorage.getItem("ability_streak"))
                    localStorage.setItem("ability_streak", streak + 1)
                    l_atempts = parseInt(localStorage.getItem("total_ability_atempts"))
                    localStorage.setItem("total_ability_atempts", l_atempts + atempts)
                }
            }
        }
    });
}

function abilityTypeGuess() {
    console.log("Guess!")
    if(type === 'skill') {
        button_skill.setAttribute("class", "correct"); 
        button_ult.setAttribute("class", "incorrect")
    }
    else {
        button_skill.setAttribute("class", "incorrect")
        button_ult.setAttribute("class", "correct")
    }
}