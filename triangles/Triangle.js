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
        let rtop, gtop, btop;
        let rbot, gbot, bbot;

        if (cycleNumber == 0) {
            rtop = map(this.ycenter, -ybuffer-squareSize*2, cycleLocation, color1[0], color2[0]);
            gtop = map(this.ycenter, -ybuffer-squareSize*2, cycleLocation, color1[1], color2[1]);
            btop = map(this.ycenter, -ybuffer-squareSize*2, cycleLocation, color1[2], color2[2]);

            rbot = map(this.ycenter, cycleLocation, ybuffer+squareSize*2, color2[0], color1[0]);
            gbot = map(this.ycenter, cycleLocation, ybuffer+squareSize*2, color2[1], color1[1]);
            bbot = map(this.ycenter, cycleLocation, ybuffer+squareSize*2, color2[2], color1[2]);
        } else {
            rtop = map(this.ycenter, -ybuffer-squareSize*2, cycleLocation, color2[0], color1[0]);
            gtop = map(this.ycenter, -ybuffer-squareSize*2, cycleLocation, color2[1], color1[1]);
            btop = map(this.ycenter, -ybuffer-squareSize*2, cycleLocation, color2[2], color1[2]);

            rbot = map(this.ycenter, cycleLocation, ybuffer+squareSize*2, color1[0], color2[0]);
            gbot = map(this.ycenter, cycleLocation, ybuffer+squareSize*2, color1[1], color2[1]);
            bbot = map(this.ycenter, cycleLocation, ybuffer+squareSize*2, color1[2], color2[2]);
        }

        const roughness = map(document.getElementById("roughness").value, 0, 100, 0, 50);
        const crand = map(noise(this.coff), 0, 1, -1 * roughness, roughness);

        if (this.ycenter > cycleLocation) {
            fill(rbot + crand, gbot + crand, bbot + crand);
            stroke(rbot + crand, gbot + crand, bbot + crand);
        } else {
            fill(rtop + crand, gtop + crand, btop + crand);
            stroke(rtop + crand, gtop + crand, btop + crand);
        }

        if (document.getElementById("checkBorder").checked) {
            stroke(colorBorder[0], colorBorder[1], colorBorder[2]);
        }
        
        triangle(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
    }
}