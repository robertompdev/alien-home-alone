class Background {
    constructor(ctx, w, h, keys) {
        this.ctx = ctx;
        this.width = w;
        this.height = h;

        this.image = new Image();
        this.image.src = 'images/background.jpg'

        this.posX = 0
        this.posY = 0

        this.velX = 1
        this.keys = keys;
    }


    draw() {

        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
        this.ctx.drawImage(this.image, this.posX + this.width, this.posY, this.width, this.height)

    }

    move() {
        this.posX -= this.velX
        if (this.posX <= -this.width) { this.posX = 0 }
    }

    setListeners() {
        document.onkeydown = e => {
            switch (e.keyCode) {

                case this.keys.RIGHT_KEY:
                    this.move();
                    break;

                default:
                    break;

            }
        };
    }
}