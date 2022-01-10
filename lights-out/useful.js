// str must be of type "01", returns [0, 1]
function strToArr(str) {
    return str.toString().split("").map(Number)
}

// array must be of type [0, 1], returns "01"
function arrToStr(arr) {
    return arr.map(String).join("");
}

// creates a copy of a 2D array
function copy2DArray(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        newArr.push(arr[i].slice());
    }
    return newArr;
}

// returns a random integer from 0 to the maximum number, inclusive
function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max + 1));
}

// returns the time elapsed since the parameter as MM:SS
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
