/*
https://github.com/processing/p5.js/wiki/Positioning-your-canvas
http://jscolor.com/examples/

make option to cycle colors so they rotate through the image

eventually convert this into a class that i make into an object with different parameters
cycle, n# of colors, different shapes, size of background

event listener for menu hover effect
*/
let density = document.getElementById("density").value;
let squareSize;
let rows, cols;

let xbuffer, ybuffer;

let points, triangles;

const color1 = [56, 252, 154];
const color2 = [195, 0, 255];
const colorBorder = [201, 250, 255];

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("sketch-container");
    canvas.style('display', 'block');

    initialVars();
    genPoints();
    genTriangles();
}

function draw() {
    background(0, 0, 0);
    translate(xbuffer, ybuffer);
    scale(1.5, 1.5);
    
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            points[y][x].move();
        }
    }

    for (let i = 0; i < triangles.length; i++) {
        triangles[i].display();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);

    density = document.getElementById("density").value;

    initialVars();
    genPoints();
    genTriangles();
}

function initialVars() {
    squareSize = 1 / density * height;
    rows = Math.ceil(height/squareSize) + 4;
    cols = Math.ceil(width/squareSize) + 2;

    xbuffer = width/2 - squareSize;
    ybuffer = height/2 - squareSize*2;
}

function genPoints() {
    points = [];
    for (let y = 0; y < rows; y++) {
        points.push([]);
        for (let x = 0; x < cols; x++) {
            points[y].push(new Point(squareSize*x-(width/2), squareSize*y-(height/2)));
        }
    }
}

function genTriangles() {
    triangles = [];
    for (let y = 0; y < rows-1; y++) {
        for (let x = 0; x < cols-1; x++) {
            if (random() > 0.5) {
                triangles.push(new Triangle(points[y][x], points[y+1][x], points[y][x+1]));
                triangles.push(new Triangle(points[y+1][x], points[y][x+1], points[y+1][x+1]));
            } else {
                triangles.push(new Triangle(points[y][x], points[y+1][x], points[y+1][x+1]));
                triangles.push(new Triangle(points[y][x], points[y][x+1], points[y+1][x+1]));
            }
        }
    }
}

function updateColor(picker) {
    eval(picker.styleElement.id)[0] = picker.rgb[0];
    eval(picker.styleElement.id)[1] = picker.rgb[1];
    eval(picker.styleElement.id)[2] = picker.rgb[2];
}

function updateMenu() {
    if (document.getElementById("checkMenu").checked) {
        document.getElementById("menu").style.opacity = "1";
    } else {
        document.getElementById("menu").style.opacity = "0";
    }
}

function showMenu() {
    document.getElementById("menu").style.opacity = "1";
}