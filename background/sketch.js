/*
triangulate and draw the triangles at those points

color the triangles based on their average point's y coordinate
use a corresponding gradient

just have lights be big gradient things that blend together

maybe move each point only around it's own area slightly, and keep the triangle relationships constant
test triangle strips with different heights
issue is it will look weird at the edges, how do i make it so there are particles off the screen in a small area

https://github.com/processing/p5.js/wiki/Positioning-your-canvas


instead of triangle strip, create triangle class, draw the triangle based on avg of y, and add to array triangles

in setup create a triangle array, make sure to put it in resize too
then in draw, simply go through all of the triangles and display them, and change their color based on their center
use map to get shade or opacity, and another map for color tones?

create gen points and gen triangles functions
*/
const rows = 9;
const cols = Math.floor(rows * 1.4);
let points = [];
let triangles = [];

const speed = 0.005;

function setup() {
    const c= createCanvas(windowWidth, windowHeight);
    c.style('display', 'block');

    genPoints();
    genTriangles();
}

function draw() {
    background(0, 0, 0);
    translate(-width/5, -height/5);

    fill(0);
    stroke(255);

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
            points[y].push(new Point(width/cols*x*1.2, height/rows*y*1.2));
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