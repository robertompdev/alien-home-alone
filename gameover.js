class GameOverScreen {
    constructor(ctx, w, h) {
        this.ctx = ctx;
        this.gameWidth = w;
        this.gameHeight = h;

        this.image = new Image();
        this.image.src = 'images/gameover.png';

        this.width = w;
        this.height = h;

        this.posX = 0;
        this.posY = 0;

    }

    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)

    }
}