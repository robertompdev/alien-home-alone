class Bullet {
    constructor(ctx, x, y, y0) {
        this.ctx = ctx;
        this.posX = x;
        this.posY = y + 140;
        this.posY0 = y0
        this.radius = 4;
        this.velX = 15;
        this.width = 4
    }

    draw(framescounter) {
        this.ctx.beginPath()
        this.ctx.fillStyle = "#fceb32";
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();
    }

    move() {
        this.posX -= this.velX
    }

    isCollision() {
        return this.bullets.some(
            eachBullets =>
                this.player1.posX + this.player1.width >= eachBullets.posX &&
                this.player1.posY + this.player1.height >= eachBullets.posY &&
                this.player1.posX <= eachBullets.posX + eachBullets.width
        );
    }
}

