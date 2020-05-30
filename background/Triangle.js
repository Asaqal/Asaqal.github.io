class Triangle {
    constructor(p1, p2, p3) {
        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;

        this.xcenter = (p1.x + p2.x + p3.x) / 3;
        this.ycenter = (p1.y + p2.y + p3.y) / 3;

        this.coff = random(0, 100);
    }

    display() {
        const r = map(this.ycenter, 0, height, color1[0], color2[0]);
        const g = map(this.ycenter, 0, height, color1[1], color2[1]);
        const b = map(this.ycenter, 0, height, color1[2], color2[2]);

        const roughness = document.getElementById("roughness").value
        const crand = map(noise(this.coff), 0, 1, -1 * roughness, roughness);
        fill(r + crand, g + crand, b + crand);

        if (document.getElementById("checkBorder").checked) {
            stroke(colorBorder[0], colorBorder[1], colorBorder[2]);
        } else {
            stroke(r, g, b);
        }
        triangle(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
    }
}