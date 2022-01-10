let board, originalBoard;

// creates a 5x5 board array with random tiles already on
function genBoard() {
    board = [];
    for (let y = 0; y < 5; y++) {
        board.push([]);
        for (let x = 0; x < 5; x++) {
            board[y].push(randomInt(1));
        }
    }
    
    originalBoard = copy2DArray(board);

    // generates a board until a solvable one is found
    if (solvable()) {
        resetBoard();
        t0 = performance.now();
    } else {
        genBoard();
    }
}

// checks if the generated board is solvable
function solvable() {
    while (!checkWin() && nextMove()) {
        applyToTiles(nextMove(), mouseClick);
    }
    if (checkWin()) {
        return true;
    } else {
        return false;
    }
}

// checks if the board is in a solved state
function checkWin() {
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if (board[y][x] != board[0][0]) {
                return false;
            }
        }
    }
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if (board[y][x] != board[1][1]) {
                return false;
            }
        }
    }
    return true;
}

// specific hints for certain bottom row combinations
bottomRowSolutions_dict = {
    "00111": "03",
    "01010": "01",
    "01101": "00",
    "10001": "03",
    "10110": "04",
    "11011": "02",
    "11100": "01"
};

// returns the next tile that should be pressed to solve the puzzle
function nextMove() {
    for (let y = 0; y < 4; y++) {
        for (let x = 0; x < 5; x++)  {
            if (board[y][x] == 1) {
                return arrToStr([y+1, x]);
            }
        }
    }

    return bottomRowSolutions_dict[arrToStr(board[4])];
}

// resets the board to its orignal state prior to being tested for solvability
function resetBoard() {
    board = copy2DArray(originalBoard);
    updateTilesToBoard();
    document.getElementById("moves").innerHTML = "Moves: 0";
}

// updates the tiles to the current board array
function updateTilesToBoard() {
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if (board[y][x] == 1) {
                document.getElementById(arrToStr([y, x])).classList.toggle("click", true);
            } else {
                document.getElementById(arrToStr([y, x])).classList.toggle("click", false);
            }
        }
    }
}

// ===========================================================================================================

// listens to user's movement over the board
document.addEventListener("mouseover", function(e) {
    if (e.target.parentElement && e.target.parentElement.tagName && e.target.parentElement.tagName == "TD") {
        applyToTiles(e.target.id, mouseOver);
    }
})

document.addEventListener("mouseout", function(e) {
    if (e.target.parentElement && e.target.parentElement.tagName && e.target.parentElement.tagName == "TD") {
        applyToTiles(e.target.id, mouseOut);
    }
})

document.addEventListener("click", function(e) {
    if (e.target.parentElement && e.target.parentElement.tagName && e.target.parentElement.tagName == "TD") {
        applyToTiles(e.target.id, mouseOver);
        applyToTiles(e.target.id, mouseClick);
        applyToTiles(e.target.id, mouseOut); // no weird animation on mobile
        addMove();
    }
})

function mouseOver(e) {
    document.getElementById(e).classList.toggle("hover", true);
}

function mouseOut(e) {
    document.getElementById(e).classList.toggle("hover", false);
}

function mouseClick(e) {
    document.getElementById(e).classList.toggle("click");
    flip(e);
}

// ===========================================================================================================

// applies the given function to the tiles in a plus shape, centered at the given tile
function applyToTiles(e, func) {
    const x = strToArr(e)[1];
    const y = strToArr(e)[0];

    if (x != 0) {
        func(arrToStr([y, x-1]));
    }
    if (x != 5-1) {
        func(arrToStr([y, x+1]));
    }
    if (y != 0) {
        func(arrToStr([y-1, x]));
    }
    if (y != 5-1) {
        func(arrToStr([y+1, x]));
    }
    func(arrToStr([y, x]));
}

// flips the current state of the given tile
function flip(e) {
    const tile = strToArr(e);

    if (board[tile[0]][tile[1]] == 0) {
        board[tile[0]][tile[1]] = 1;
    }
    else {
        board[tile[0]][tile[1]] = 0;
    }
}

// increases the move counter by one
function addMove() {
    let currentMoveNumber = Number(document.getElementById("moves").innerHTML.slice(7));
    document.getElementById("moves").innerHTML = "Moves: " + (currentMoveNumber + 1).toString();
}

// suggests the next move
function giveHint() {
    applyToTiles(nextMove(), mouseOver);
    setTimeout(function() {
        applyToTiles(nextMove(), mouseOut)
    }, 1000);
}

// ===========================================================================================================

let themeChoice = 0;
const numOfThemes = 10;

// cycles through all of the themes
function changeTheme() {
    themeChoice++;

    document.body.classList.toggle("theme"+(themeChoice-1), false);
    if (themeChoice == numOfThemes) {
        themeChoice = 0;
    }
    document.body.classList.toggle("theme"+(themeChoice), true);
}

// ===========================================================================================================

function setup() {
    document.getElementById("end").style.visibility = "hidden";
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("overlay").style.visibility = "hidden";
    genBoard();
}

function run() {
    document.getElementById("time").innerHTML = "Time: " + timeElapsed(t0);

    if (checkWin()) {
        end();
        return;
    }

    requestAnimationFrame(run);
}

function start() {
    setup();
    run();
}

function end() {
    document.getElementById("e_moves").innerHTML = document.getElementById("moves").innerHTML;
    document.getElementById("e_time").innerHTML = document.getElementById("time").innerHTML;
    document.getElementById("end").style.visibility = "visible";
    document.getElementById("overlay").style.visibility = "visible";
}