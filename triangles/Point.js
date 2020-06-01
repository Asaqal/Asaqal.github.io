class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        
        this.xorig = x;
        this.yorig = y;

        this.xoff = random(0, 1000);
        this.yoff = random(0, 1000);
    }

    move() {
        this.x = (noise(this.xoff) * width/cols * randomness) + this.xorig;
        this.y = (noise(this.yoff) * height/rows * randomness) + this.yorig;

        this.xoff += speed;
        this.yoff += speed;
    }
}