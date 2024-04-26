let select_ability = null;
let alreadyGuessed = [];
let atempts = 0;

const abilityName = document.getElementById('ability-name')

const element_cd = document.getElementById('element-countdown');
const element_cd_in = document.getElementById('element-countdown-in');
const element = document.getElementById('ability-element');
var element_cd_var = 1;

/*const button_skill = document.getElementById("button-skill");
const button_ult = document.getElementById("button-ult");
const guessTypeButtons = document.getElementById('guess-type-buttons');*/

try {
    data = JSON.parse(data);
    abilitys = JSON.parse(abilitys);
} catch {
    const characterNames = Object.keys(data);
    const characterList = document.getElementById("characters");
    characterNames.splice(-4)
    characterNames.sort().forEach(char_name => {
        var opt_name = document.createElement("option");
        display_name = data[char_name]["name"];
        opt_name.value = display_name;
        opt_name.id = charDataName(display_name);
        characterList.appendChild(opt_name);
    });
    console.log(characterNames[characterNames.length - 1])
    var char = charDataName(characterNames[(Math.floor(Math.random() * (characterNames.length - 1)))]);
    var a_type = Math.floor(Math.random() * abilitys[char].length);
    select_ability = abilitys[char][a_type];
    abilityName.innerHTML = select_ability;
    
    const inputField = document.getElementById("input");
    inputField.addEventListener(('input'), function guess(event) {
        /*if (event.type === 'keydown' || event.key === 'Enter') {*/
        let input = charDataName(inputField.value.toLowerCase());
        if(characterNames.indexOf(input) !== -1) {
            inputField.value = "";
            if(alreadyGuessed.indexOf(input) === -1) {
                atempts++;
                document.getElementById(charDataName(data[input]["name"])).remove();
                element_cd_in.innerHTML = element_cd_var - atempts;
                if (element_cd_var - atempts == 0) {
                    element_cd.style.display = 'none'
                    element_url = "abilitys/"+ char + "_" + charDataName(abilitys[char][a_type]) +".png"
                    element.src = element_url
                    element.style.display = 'block'
                }

                const ul = document.getElementById('list');
                alreadyGuessed.push(input);
                /*document.getElementById(charDataName(data[input]["name"])).remove();*/
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
                }
            }
        }
    });
}

function abilityTypeGuess() {
    console.log("Guess!")
    if(a_type === 'skill') {
        button_skill.setAttribute("class", "correct"); 
        button_ult.setAttribute("class", "incorrect")
    }
    else {
        button_skill.setAttribute("class", "incorrect")
        button_ult.setAttribute("class", "correct")
    }
}

function charDataName(display_name) {
    display_name = display_name.toLowerCase()
    display_name = display_name.replace(".", "")
    display_name = display_name.replace("• ", "")
    display_name = display_name.replace(/ /g, "_")
    display_name = display_name.replace(/[,]/g, "")
    display_name = display_name.replace(/[-]/g, "_")
    display_name = display_name.replace(/[—]/g, "_")
    display_name = display_name.replace(/[']/g, "")
    display_name = display_name.replace(/[!]/g, "")
    display_name = display_name.replace(/[?]/g, "")
    display_name = display_name.replace(/[:]/g, "")
    return display_name;
}