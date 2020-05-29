/*
https://github.com/processing/p5.js/wiki/Positioning-your-canvas
http://jscolor.com/examples/

create menu to adjust colors easily in the webpage
make option to cycle colors so they rotate through the image
make option to increase triangles which keeps the proper aspect ratio, just increases rows and cols

add a useful.js to convert rgb to hex and hex to rgb

need to figure out how to adjust # of rows and columns
but keep the triangles mesh just bigger than the screen always

choose rows and cols based off windowith and height, use aspect ratio so it looks the same i guess?
have to change translate, and area for each point? idk
maybe change # of points based on area of screen? so it looks similar, then choose rows and cols -> wont work

eventually convert this into a class that i make into an object with different parameters
cycle, n# of colors, different shapes, size of background
*/
const rows = 9;
const cols = Math.floor(rows * 1.4);
let points = [];
let triangles = [];

const speed = 0.005;

const color1 = [255, 255, 255];
const color2 = [0, 0, 0];

function setup() {
    const canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent("sketch-container");
    canvas.style('display', 'block');

    genPoints();
    genTriangles();
}

function draw() {
    background(0, 0, 0);
    translate(-width/3, -height/3);

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
    
    points = [];
    genPoints();

    triangles = [];
    genTriangles();
}

function genPoints() {
    for (let y = 0; y < rows; y++) {
        points.push([]);
        for (let x = 0; x < cols; x++) {
            points[y].push(new Point(width/cols*x*1.5, height/rows*y*1.5));
        }
    }
}

function genTriangles() {
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