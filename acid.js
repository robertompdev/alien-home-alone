class Acid {
    constructor(ctx, x, y, y0, playerH) {
        this.ctx = ctx;
        this.posX = x + 290;
        this.posY = y + 110;
        this.posY0 = y0
        this.playerHeight = playerH
        this.radius = 6;
        this.velX = 10;
    }

    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = "#04ff00";
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 3);
        this.ctx.fill();
        this.ctx.closePath();
    }

    move() {
        this.posX += this.velX
    }
}