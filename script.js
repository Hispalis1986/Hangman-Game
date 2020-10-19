// Variables
var ctx; // Context
var canvas;
var word;
var letters = 'QWERTYUIOPASDFGHJKLZXCVBNM';
var colorKey = '#585858';
var colorMargin = "#612d2d";
var startX = 200;
var startY = 300;
var lon = 35; // Length
var margin = 20;
var trackText = "";

// Array 
var key_array = new Array();
var letter_array = new Array();
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
    ctx.fillText(this.word, this.x + this.width / 2 - 5, this.y + this.height / 2 + 5);
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
            hint = "The horse neighs";
            break; // The break is important in each case
        case "ZEBRA":
            hint = "The zebra neighs";
            break;
        case "LIZERDMAN":
            hint = "The lizerdman eat ñu";
            break;
        case "SPIDER":
            hint = "The spider hunt ants";
            break;
        case "CAT":
            hint = "The cat sleep";
            break;
        case "GIRAFFE":
            hint = "The giraffe run";
            break;
        case "DOG":
            hint = "The dog eat";
            break;
        case "PINGUIN":
            hint = "The pinguin swimming";
            break;
        case "PARROT":
            hint = "The parrot fly";
            break;
        case "RABBIT":
            hint = "The rabbit run";
            break;
        case "MOUSE":
            hint = "The mouse run";
            break;
        case "HAMSTER":
            hint = "The hamster run";
            break;
        case "GOLDFISH":
            hint = "The goldfish ";
            break;
        case "TURTLE":
            hint = "The turtle eat green";
            break;
        case "DEER":
            hint = "The deer run because lion want to eat xD";
            break;
        case "GOAT":
            hint = "The goat same like Deer but with the leopard";
            break;
        case "TURKEY":
            hint = "turkey in the kitchen";
            break;
        case "SHEEP":
            hint = "The sheep in the table";
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
    var letter = "";
    var myLetter;
    var x = inicioX;
    var y = inicioY;

    for (var i = 0; i < letters.length; i++) {
        letter = letter.substr(i, 1);
        myLetter = new Key(x, y, lon, lon, letter);
        myLetter.design();
        key_array.push(myLetter);
        x += lon + margin;
        col++
        if (col == 2) {
            col = 0;
            ren++;
            if (ren == 2) {
                x = 280;
            } else {
                x = startX;
            }
            y = inicioY + ren * 50;
        }
    }
}