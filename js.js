let ligne1 = ["letter11","letter12","letter13","letter14","letter15","letter16"]
let ligne2 = ["letter21","letter22","letter23","letter24","letter25","letter26"]
let ligne3 = ["letter31","letter32","letter33","letter34","letter35","letter36"]
let ligne4 = ["letter41","letter42", "letter43","letter44","letter45","letter46"]
let ligne5 = ["letter51","letter52","letter53","letter54","letter55","letter56"]
let ligne6 = ["letter61","letter62","letter63","letter64","letter65","letter66"]

let lignes = [ligne1, ligne2, ligne3, ligne4, ligne5, ligne6]

let startL = 0
let startC = 0

let SIZE = 6

let mot = "faisan"

document.addEventListener('keyup', logKey);

//set lignes not editables id not current line
function setLignesNotEditable(){
    for(var i = 0; i < SIZE; i++){
        if(i != startL){
            for(var j = 0; j < SIZE; j++){
                document.getElementById(lignes[i][j]).readOnly = "true";
            }
        }
        else if(i == startL){
            for(var j = 0; j < SIZE; j++){
                document.getElementById(lignes[i][j]).readOnly = false;
            }
        }
    }
    document.getElementById(lignes[startL][startC]).focus()
}

//On backspace key pressed, delete field value and focus on precedent
//On enter key pressed, check if word is good or not
function logKey(e){
    if(e.code == "Backspace"){
        if(startC - 1 >= 0){
            document.getElementById(lignes[startL][startC]).innerHTML = ""
            document.getElementById(lignes[startL][startC - 1]).focus()
            startC = startC - 1
        }
    }
    else if(e.code == "Enter"){
        //verifier mot
        checkWord()
    }
}

//Check if a word is good, colorate case, go to next line, copy to clipboard
function checkWord(){
    var ok = 0
    for(var i = 0; i < SIZE; i++){
        if(mot[i] ==  document.getElementById(lignes[startL][i]).value){
            document.getElementById(lignes[startL][i]).style.backgroundColor = "green"
            ok++
        }
        else{
            document.getElementById(lignes[startL][i]).style.backgroundColor = "red"
        }
    }
    console.log(ok)
    //focus newLine
    if(startL + 1 < SIZE && ok < SIZE - 1){
        startC = 0
        startL += 1
        setLignesNotEditable()
    }
    else{
        var copy = buildCopy()
        navigator.clipboard.writeText(copy);
    }
}

//build discord formatted message
function buildCopy(){
    var rep = ""
    for(var i = 0; i <= startL; i++){
        for(var j = 0; j < SIZE; j++){
            console.log( document.getElementById(lignes[i][j]).style.backgroundColor)
            if( document.getElementById(lignes[i][j]).style.backgroundColor == 'red'){
                rep += ":red_square:"
            }
            else if( document.getElementById(lignes[i][j]).style.backgroundColor == 'green'){
                rep += ":green_square:"
            }
            else if( document.getElementById(lignes[i][j]).style.backgroundColor == 'yellow'){
                rep += ":yellow_square:"
            }
            else{
                rep+= ":black_large_square"
            }
        }
        rep+="\n"
    }
    return rep
}

//When a character is entered, focus on next field
function changeTArea(){
    if(startC + 1< SIZE){
        document.getElementById(lignes[startL][startC + 1]).focus()
        startC = startC + 1
    }
}

window.onload = setLignesNotEditable