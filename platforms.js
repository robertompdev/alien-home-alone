class Platform {
    constructor(ctx, randomNo) {
        this.ctx = ctx;
        this.posX = 1500;
        this.posY = 470;
        this.image = new Image();
        this.image.src = 'images/platform.gif';
        this.width = 400;
        this.height = 60;
        this.velX = -7;
        this.velXodd = -20;
        this.randomNo = randomNo;
    }
    draw() {
        this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height)
    }
    //----DETERMINA LA VELOCIDAD A LA QUE SE VA A MOVER LA PLATAFORMA O LA ALTURA SEGÚN EL NÚMERO randomNo QUE VIENE COMO ARGUMENTO---//
    move() {
        if (this.randomNo == 1) {
            this.posY = 180
            this.posX += -2
        } else if (this.randomNo == 2) {
            this.posX += this.velXodd
        } else {
            this.posX += this.velX
        }
    }
}