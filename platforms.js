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

    //----DETERMINA LA VELOCIDAD A LA QUE SE VA A MOVER LA PLATAFORMA SEGÚN EL NÚMERO randomNo QUE VIENE COMO ARGUMENTO---//
    move() {

        if (this.randomNo != 5) {
            this.posX += this.velX
        } else {
            this.posX += this.velXodd
        }

    }




}