class LifeIcons {
    constructor(ctx, w, h, arrLength) {
        this.ctx = ctx;
        this.gameWidth = w;
        this.gameHeight = h;

        this.image = new Image();
        this.image.src = 'images/alien-icon.gif';

        this.width = 80;
        this.height = 80;

        this.posX = this.gameWidth / 15 + (this.width + 20) * arrLength;
        this.posY = 50;

    }

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)

    }
}