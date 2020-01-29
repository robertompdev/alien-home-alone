class Platform {
    constructor(ctx) {
        this.ctx = ctx;
        this.posX = 1500;
        this.posY = 470;
        this.image = new Image();
        this.image.src = 'images/platform.gif';
        this.width = 400;
        this.height = 60;
        this.velX = 7;

    }

    draw(framescounter) {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)

    }

    move() {
        this.posX -= this.velX
    }




}