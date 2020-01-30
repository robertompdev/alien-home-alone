class AlienWound {
    constructor(ctx) {
        this.ctx = ctx;

        this.image = new Image();
        this.image.src = 'images/alien-wound.png';

        this.width = 60;
        this.height = 60;

    }

    draw(posX, posY) {

        this.ctx.drawImage(this.image, posX, posY, this.width, this.height)

    }
}