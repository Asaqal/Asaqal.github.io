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
        this.x = (noise(this.xoff) * width/cols * 3) + this.xorig;
        this.y = (noise(this.yoff) * height/rows * 3) + this.yorig;

        const speed = map(document.getElementById("speed").value, 0, 100, 0, 0.025);
        this.xoff += speed;
        this.yoff += speed;
    }
}