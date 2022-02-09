let ligne1 = ["letter11","letter12","letter13","letter14","letter15","letter16","letter17", "letter18", "letter19","letter110","letter111"]
let ligne2 = ["letter21","letter22","letter23","letter24","letter25","letter26","letter27", "letter28", "letter29","letter210","letter211"]
let ligne3 = ["letter31","letter32","letter33","letter34","letter35","letter36","letter37", "letter38", "letter39","letter310","letter311"]
let ligne4 = ["letter41","letter42","letter43","letter44","letter45","letter46","letter47", "letter48", "letter49","letter410","letter411"]
let ligne5 = ["letter51","letter52","letter53","letter54","letter55","letter56","letter57", "letter58", "letter59","letter510","letter511"]
let ligne6 = ["letter61","letter62","letter63","letter64","letter65","letter66","letter67", "letter68", "letter69","letter610","letter611"]

let lignes = [ligne1, ligne2, ligne3, ligne4, ligne5, ligne6]

let startL = 0
let startC = 0

let MAX_LIGNES = 6
let SIZE = MAX_LIGNES
let MAXSIZE = 10
let MAXCHARSIZE = 11

let mot = "faisan"

document.addEventListener('keyup', logKey);

//create all data on page load
function onPageLoad(){
    clearTextArea()
    mot = dictionnaire[Math.floor(Math.random() * dictionnaire.length)].toLowerCase()
    MAXSIZE = mot.length
    console.log(mot)
    hideUnnecessaryArea()
    setLignesNotEditable()
}

//hide text area that are too much compare to word size
function hideUnnecessaryArea(){
    for(var i = 0; i< SIZE; i++){
        for(var j = MAXSIZE; j < MAXCHARSIZE; j++){
            document.getElementById(lignes[i][j]).hidden = true
        }
    }
}

function clearTextArea(){
    for(var i = 0; i < MAX_LIGNES; i++){
        for(var j=0; j < MAXCHARSIZE;j++){
            document.getElementById(lignes[i][j]).value = ""
        }
    }
}

//set lignes not editables id not current line
function setLignesNotEditable(){
    for(var i = 0; i < SIZE; i++){
        if(i != startL){
            for(var j = 0; j < MAXSIZE; j++){
                document.getElementById(lignes[i][j]).readOnly = "true";
            }
        }
        else if(i == startL){
            for(var j = 0; j < MAXSIZE; j++){
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
    for(var i = 0; i < MAXSIZE; i++){
        if(mot[i] ==  document.getElementById(lignes[startL][i]).value){
            document.getElementById(lignes[startL][i]).style.backgroundColor = "green"
            ok++
        }
        else{
            document.getElementById(lignes[startL][i]).style.backgroundColor = "yellow"
        }
    }
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
    var rep = "Le mot_caché\n" + (startL + 1) + "/" + MAX_LIGNES + "\n"
    for(var i = 0; i <= startL; i++){
        for(var j = 0; j < MAXSIZE; j++){
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
    return rep + "siteAddr"
}

//When a character is entered, focus on next field
function changeTArea(){
    if(startC + 1< MAXSIZE){
        document.getElementById(lignes[startL][startC + 1]).focus()
        startC = startC + 1
    }
}

window.onload = onPageLoad