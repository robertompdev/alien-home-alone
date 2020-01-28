class Bullet {
    constructor(ctx, x, y, y0) {
        this.ctx = ctx;
        this.posX = x;
        this.posY = y + 140;
        this.posY0 = y0
        //this.playerHeight = playerH
        this.radius = 4;
        this.velX = 10;
        this.width = 4
        //this.velY = 1;

        //this.gravity = 0.25;
    }

    draw(framescounter) {        //DIbujamos las balas con un arco
        this.ctx.beginPath()
        this.ctx.fillStyle = "#fceb32";
        this.ctx.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.closePath();

    }

    move() {
        this.posX -= this.velX
        //this.posY += this.velY        //Añadimos velY linear para que caigan
        //this.velY += this.gravity     //Modificamos la velY para generar el efecto gravedad

        // if (this.posY >= this.playerHeight + this.posY0) {
        //     this.velY *= -1   //Si llegan al suelo invertimos su velocidad para que "reboten"
        // }
    }

    isCollision() {
        return this.bullets.some(
            eachBullets =>
                this.player1.posX + this.player1.width >= eachBullets.posX &&
                this.player1.posY + this.player1.height >= eachBullets.posY &&
                this.player1.posX <= eachBullets.posX + eachBullets.width
        );
        //fin del juego, detenemos intervalo
    }
}