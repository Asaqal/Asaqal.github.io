/*
BEFORE GITHUB:
reorganize js
comment all js code

BEFORE AP:
make lights square and get rid of the rounded corner code
get rid of this comment

BEFORE PORTFOLIO:
get rid of canvas, replace with a table of rounded buttons
redo all of the css using %s instead of px
onhover have tiles outline with opposite color
on click have tiles fade into opposite color
add favicon
autoscale so it fits the page
get rid of reset button, move it to the right -> help button -> highlights (hover effect) the next move to solve it
maybe put themes in json?
make on win, the winning prompt is opposite color of the board behind it
make all text unselectable

*/

const c = document.getElementById("game");
const ctx = c.getContext("2d");
const width = c.width;
const height = c.height;

let board, originalBoard;
let moves = 0;
let t0 = 0;

const theme0 = {
    "name" : "theme0",
    "background" : "#00171F",
    "primary" : "#003459",
    "secondary" : "#ffffe5",
    "accent" : "#eea243"
}

const theme1 = {
    "name" : "theme1",
    "background" : "#eea243",
    "primary" : "#003459",
    "secondary" : "#ffffe5",
    "accent" : "#00171F"
}

const theme2 = {
    "name" : "theme2",
    "background" : "#1d3557",
    "primary" : "#457b9d",
    "secondary" : "#f1faee",
    "accent" : "#e63946"
}

const theme3 = {
    "name" : "theme3",
    "background" : "#e63946",
    "primary" : "#457b9d",
    "secondary" : "#f1faee",
    "accent" : "#1d3557"
}

const theme4 = {
    "name" : "theme4",
    "background" : "#114b5f",
    "primary" : "#1a936f",
    "secondary" : "#f3e9d2",
    "accent" : "#88d498"
}

const theme5 = {
    "name" : "theme5",
    "background" : "#88d498",
    "primary" : "#1a936f",
    "secondary" : "#f3e9d2",
    "accent" : "#114b5f"
}

const theme6 = {
    "name" : "theme6",
    "background" : "#ffcbd2",
    "primary" : "#ffb4a2",
    "secondary" : "#e5989b",
    "accent" : "#6d6875"
}

const theme7 = {
    "name" : "theme7",
    "background" : "#6d6875",
    "primary" : "#ffb4a2",
    "secondary" : "#e5989b",
    "accent" : "#ffcbd2"
}

const theme8 = {
    "name" : "theme8",
    "background" : "#caf0f8",
    "primary" : "#0077b6",
    "secondary" : "#00b4d8",
    "accent" : "#03045e"
}

const theme9 = {
    "name" : "theme9",
    "background" : "#03045e",
    "primary" : "#0077b6",
    "secondary" : "#00b4d8",
    "accent" : "#caf0f8"
}

const themes = [theme0, theme1, theme2, theme3, theme4, theme5, theme6, theme7, theme8, theme9];

let theme = theme0;
let themeChoice = 0;

function changeTheme() {
    themeChoice++;

    document.body.classList.toggle(themes[themeChoice-1]["name"], false);
    if (themeChoice == themes.length) {
        document.body.classList.toggle(themes[0]["name"], true);
        themeChoice = 0;
    } else {
        document.body.classList.toggle(themes[themeChoice]["name"], true);
    }
    theme = themes[themeChoice];
}

// Returns a random integer from 0 to the maximum number, inclusive
function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
}

// Returns the other option, using 0s and 1s
function opposite(x) {
    if (x == 0) {
        return 1;
    }
    else {
        return 0;
    }
}

// Checks if two 2D arrays are equal
function arraysEqual(a, b) {
    for (let i = 0; i < a.length; i++) {
        if (a[i] != b[i]) {
            return false;
        }
    }
    return true;
}

// Creates a copy of a 2D array
function copy2DArray(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i].slice());
    }
    return newArr;
}

function timeElapsed(t0) {
    let secs = Math.floor((performance.now() - t0) / 1000);
    let mins = Math.floor(secs / 60);

    if (mins != 0) {
        secs %= (mins * 60);
    }

    mins = mins.toString().padStart(2, "0");
    secs = secs.toString().padStart(2, "0");

    return mins + ":" + secs;
}

// Finds the mouse position upon a click
function mouseClick(event) {
    const rect = event.target.getBoundingClientRect();
    const mouseX = Math.floor(event.clientX - rect.left);
    const mouseY = Math.floor(event.clientY - rect.top);
    mouseToLight(mouseX, mouseY);
}

function mouseToLight(mouseX, mouseY) {
    const x = Math.floor(mouseX / (width/5));
    const y = Math.floor(mouseY / (width/5));
    clickLight(x, y);
}

// Creates a 5x5 board with random lights on
function genBoard() {
    board = [];
    for (let y = 0; y < 5; y++) {
        board.push([]);
        for (let x = 0; x < 5; x++) {
            board[y].push(randomInt(1));
        }
    }
    
    originalBoard = copy2DArray(board);

    if (solvable(board)) {
        resetBoard();
        t0 = performance.now();
    } else {
        genBoard();
    }
}

function resetBoard() {
    board = copy2DArray(originalBoard);
    moves = 0;
}

// Upon clicking a light, the selected light and 4 adjacent lights are flipped
function clickLight(x, y) {
    if (x != 0) {
        board[y][x-1] = opposite(board[y][x-1]);
    }
    if (x != 5-1) {
        board[y][x+1] = opposite(board[y][x+1]);
    }
    if (y != 0) {
        board[y-1][x] = opposite(board[y-1][x]);
    }
    if (y != 5-1) {
        board[y+1][x] = opposite(board[y+1][x]);
    }
    board[y][x] = opposite(board[y][x]);

    moves++;
}

// Checks if the generated board is solvable
function solvable(board) {
    solvableBoards = [
        [0, 0, 0, 0, 0],
        [1, 1, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [1, 0, 1, 1, 0],
        [1, 0, 0, 0, 1],
        [0, 1, 1, 0, 1],
        [0, 1, 0, 1, 0],
        [0, 0, 1, 1, 1]
    ];
    
    // Goes through each of the rows except for the last, clicking underneath each of the x ones
    for (let y = 0; y < 5-1; y++) {
        for (let x = 0; x < 5; x++) {
            if (board[y][x] == 1) {
                clickLight(x, y+1);
            }
        }
    }

    // Checks if the bottom row is one of the solvable rows
    for (let i = 0; i < solvableBoards.length; i++) {
        if (arraysEqual(solvableBoards[i], board[5-1])) {
            return true;
        }
    }
    return false;
}

function checkWin(board) {
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if (board[y][x] != board[0][0]) {
                return false;
            }
        }
    }
    return true;
}

/*
Draws rectangles with rounded corners

Usage:
    var canvas = document.getElementById("canvas");
    var c = canvas.getContext("2d");
    c.fillStyle = "blue";
    c.roundRect(50, 100, 50, 100, {upperLeft:10,upperRight:10}, true, true);

Source:
    https://stackoverflow.com/questions/1255512/how-to-draw-a-rounded-rectangle-on-html-canvas
*/
CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius, fill, stroke) {
    // edit this so i can put in the colors directly to function call, and linewidth too
    var cornerRadius = { upperLeft: 0, upperRight: 0, lowerLeft: 0, lowerRight: 0 };
    if (typeof stroke == "undefined") {
        stroke = true;
    }
    if (typeof radius === "object") {
        for (var side in radius) {
            cornerRadius[side] = radius[side];
        }
    }

    this.beginPath();
    this.lineWidth = "12";
    this.moveTo(x + cornerRadius.upperLeft, y);
    this.lineTo(x + width - cornerRadius.upperRight, y);
    this.quadraticCurveTo(x + width, y, x + width, y + cornerRadius.upperRight);
    this.lineTo(x + width, y + height - cornerRadius.lowerRight);
    this.quadraticCurveTo(x + width, y + height, x + width - cornerRadius.lowerRight, y + height);
    this.lineTo(x + cornerRadius.lowerLeft, y + height);
    this.quadraticCurveTo(x, y + height, x, y + height - cornerRadius.lowerLeft);
    this.lineTo(x, y + cornerRadius.upperLeft);
    this.quadraticCurveTo(x, y, x + cornerRadius.upperLeft, y);
    this.closePath();
    if (stroke) {
        this.stroke();
    }
    if (fill) {
        this.fill();
    }
} 

// Draws the board
function drawBoard(board) {
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            ctx.beginPath();
            if (board[y][x] == 0) {
                ctx.fillStyle = theme["primary"];
            } else {
                ctx.fillStyle = theme["accent"];
            }
            // ctx.rect(x * (width/5)+10, y * (width/5)+10, width/5 - 10, width/5 - 10);
            // ctx.fill();
            ctx.roundRect(x * (width/5)+10, y * (width/5)+10, width/5-10, width/5-10, {upperLeft:10,upperRight:10,lowerRight:10,lowerLeft:10}, true, false);
        }
    }
}

// Performs functions that only need to run once in the beginning
function setup() {
    document.getElementById("startGame").style.visibility = "hidden";
    document.getElementById("endGame").style.visibility = "hidden";
    document.getElementById("overlay").style.visibility = "hidden";
    genBoard();
}

// Performs functions that need to run every frame
function drawGame() {
    drawBoard(board);
    document.getElementById("moveCounter").innerHTML = "Moves: " + moves;
    document.getElementById("timeElapsed").innerHTML = "Time: " + timeElapsed(t0);

    // change to on mouse click rather than every frame
    if (checkWin(board)) {
        endGame();
        return;
    }
    requestAnimationFrame(drawGame);
}

function endGame() {
    document.getElementById("endGame").style.visibility = "visible";
    document.getElementById("overlay").style.visibility = "visible";
    document.getElementById("eG_moveCounter").innerHTML = document.getElementById("moveCounter").innerHTML;
    document.getElementById("eG_timeElapsed").innerHTML = document.getElementById("timeElapsed").innerHTML;
}

// Runs the game
function runGame() {
    setup();
    drawGame();
}

runGame();
document.getElementById("overlay").style.visibility = "visible";
document.getElementById("startGame").style.visibility = "visible";