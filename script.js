// Variables
var ctx; // Context
var canvas;
var word;
var letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
var colorKey = '#585858';
var colorMargin = "red";
var startX = 200;
var startY = 300;
var lon = 35; // Length
var margin = 20;
var trackText = "";

// Array 
var keys_array = new Array();
var letters_array = new Array();
var words_array = new Array();

// Control Variables
var success = 0;
var wrongs = 0;

// Words
words_array.push("HORSE");
words_array.push("ZEBRA");
words_array.push("LIZERDMAN");
words_array.push("SPIDER");
words_array.push("CAT");
words_array.push("GIRAFFE");
words_array.push("DOG");
words_array.push("PINGUIN");
words_array.push("PARROT");
words_array.push("RABBIT");
words_array.push("MOUSE");
words_array.push("HAMSTER");
words_array.push("GOLDFISH");
words_array.push("TURTLE");
words_array.push("DEER");
words_array.push("GOAT");
words_array.push("TURKEY");
words_array.push("SHEEP");

// OBjects
function Key(x, y, width, height, letter) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.letter = letter;
    this.design = designKey;
}

function Letter(x, y, width, height, letter) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.letter = letter;
    this.design = designBoxLetter;
    this.designLetter = designLetterLetter;
}

// Functions 

// Design Keys
function designKey() {
    ctx.fillStyle = colorKey;
    ctx.strokeStyle = colorMargin;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);

    ctx.fillStyle = "white";
    ctx.font = "bold 20px Courier";
    ctx.fillText(this.letter, this.x + this.width / 2 - 5, this.y + this.height / 2 + 5);
}

// Design Letter and the Box
function designLetterLetter() {
    var w = this.width;
    var h = this.height;

    ctx.fillStyle = "black";
    ctx.font = "bold 40px Courier"
    ctx.fillText(this.letter, this.x + w / 2 - 12, this.y + h / 2 + 14);
}

function designBoxLetter() {
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.strokeRect(this.x, this.y, this.width, this.height);
}

// function to give a hint to a user
function hintFunction(word) {
    let hint = ""; // Creating a new variable local
    switch (word) { // Switch is created to be able to control the tracks according to the word
        case "HORSE": // A case should be made for each word
            hint = " neighs";
            break; // The break is important in each case
        case "ZEBRA":
            hint = " neighs";
            break;
        case "LIZERDMAN":
            hint = " eat ñu";
            break;
        case "SPIDER":
            hint = " hunt ants";
            break;
        case "CAT":
            hint = "hunt mouse";
            break;
        case "GIRAFFE":
            hint = "In the jungle";
            break;
        case "DOG":
            hint = " Always at home";
            break;
        case "PINGUIN":
            hint = "swimming";
            break;
        case "PARROT":
            hint = "Fly in the jungle";
            break;
        case "RABBIT":
            hint = " eat carrot";
            break;
        case "MOUSE":
            hint = " eat cheese";
            break;
        case "HAMSTER":
            hint = "eat cheese";
            break;
        case "GOLDFISH":
            hint = "ocean ";
            break;
        case "TURTLE":
            hint = "hard as stone";
            break;
        case "DEER":
            hint = " run because lion want to eat xD";
            break;
        case "GOAT":
            hint = " in the mountain";
            break;
        case "TURKEY":
            hint = "Thanksgiving";
            break;
        case "SHEEP":
            hint = "in the farm";
            break;
        default:
            hint = "LOL";

    }
    // Design canvas word , design in the top left
    ctx.fillStyle = "black"; // letter color
    ctx.font = "bold 20px Courier"; //type and size
    ctx.fillText(hint, 10, 15); // Variable Hint , and PosX and PosY
}

/**
 * Distribute our KEYBOARD with their respective letters to the arrangement of our array
 */

function keyboard() {
    var ren = 0;
    var col = 0;
    var letter = " ";
    var myLetter;
    var x = startX;
    var y = startY;

    for (var i = 0; i < letters.length; i++) {
        letter = letters.substr(i, 1);
        myLetter = new Key(x, y, lon, lon, letter);
        myLetter.design();
        keys_array.push(myLetter);
        x += lon + margin;
        col++;
        if (col == 10) {
            col = 0;
            ren++;
            if (ren == 2) {
                x = 280;
            } else {
                x = startX;
            }

        }
        y = startY + ren * 50;
    }
}

// Here we get our word randomly and divide it into letters

function designWord() {
    var p = Math.floor(Math.random() * words_array.length);
    word = words_array[p];

    hintFunction(word);

    var w = canvas.width;
    var len = word.length;
    var ren = 0;
    var col = 0;
    var y = 230;
    var lon = 50;
    var x = (w - (lon + margin) * len) / 2;

    for (var i = 0; i < word.length; i++) {
        letter = word.substr(i, 1);
        myLetter = new Letter(x, y, lon, lon, letter);
        myLetter.design()
        letters_array.push(myLetter);
        x += lon + margin;
    }
}

// Draw scaffold and parts of the character as the case may be

function hang(wrongs) {
    var image = new Image();
    image.src = "images/ahorcado" + wrongs + ".png";
    image.onload = function () {
        ctx.drawImage(image, 390, 0, 230, 230);
    }
}

// Adjust coordinates

function set(xx, yy) {
    var posCanvas = canvas.getBoundingClientRect();
    var x = xx - posCanvas.left - 15;
    var y = yy - posCanvas.top - 15;
    return {
        x: x,
        y: y
    }
}

function select(e) {
    var pos = set(e.clientX, e.clientY);
    var x = pos.x;
    var y = pos.y;
    var key;
    var flag = false;

    for (var i = 0; i < keys_array.length; i++) {
        key = keys_array[i];
        if (key.x > 0) {
            if ((x > key.x) && (x < key.x + key.width) && (y > key.y) && (y < key.y + key.height)) {
                break;
            }
        }
    }
    console.log(key);
    if (i < keys_array.length) {
        for (var i = 0; i < word.length; i++) {
            letter = word.substr(i, 1);
            if (letter == key.letter) { // compare if its success
                box = letters_array[i];
                box.designLetter()
                success++;
                flag = true;
            }
        }
        if (flag == false) { // If it fails, increase the errors and check if it lost to send the gameover function
            wrongs++;
            hang(wrongs);
            if (wrongs == 5) gameOver(wrongs);
        }
        // Borra la tecla de presionado
        ctx.clearRect(key.x - 1, key.y - 1, key.width + 2, key.height + 2);
        key.x - 1;
        // Mira si gana y manda la funcion gameover
        if (success == word.length) gameOver(wrongs);
    }

}
//  We erase the keys and the word with their boxes and send a message depending on the case if it was won or lost
function gameOver(wrongs) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";

    ctx.font = "bold 50px Courier";
    if (wrongs < 5) {
        ctx.fillText("Very Good, the word is: ", 110, 280);
    } else {
        ctx.fillText("Im sorry, the word was: ", 110, 280);
    }
    ctx.font = "bold 80px Courier";
    lon = (canvas.width - (word.length * 48)) / 2;
    ctx.fillText(word, lon, 380);
    hang(wrongs);
}

// 

window.onload = function () {
    canvas = document.getElementById("screen");
    if (canvas && canvas.getContext) {
        ctx = canvas.getContext("2d");
        if (ctx) {
            keyboard();
            designWord();
            hang(wrongs);
            canvas.addEventListener("click", select, false);
        } else {
            alert("Error loading text")
        }
    }
}