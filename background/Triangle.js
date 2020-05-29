class Triangle {
    constructor(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;

        this.xcenter = (p1.x + p2.x + p3.x) / 3;
        this.ycenter = (p1.y + p2.y + p3.y) / 3;
    }

    display() {
        const r = map(this.ycenter, 0, height, color1[0], color2[0]);
        const g = map(this.ycenter, 0, height, color1[1], color2[1]);
        const b = map(this.ycenter, 0, height, color1[2], color2[2]);

        fill(r, g, b);
        stroke(r, g, b);
        triangle(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
    }
}