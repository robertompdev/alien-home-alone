class Enemy {

    constructor(ctx, w, h, player1) {
        this.ctx = ctx;
        this.gameWidth = w;
        this.gameHeight = h;

        this.image = new Image();
        this.image.src = 'images/enemy1.gif';

        this.width = 140 * 1.2;
        this.height = 180 * 1.2;

        this.posX = 1200;
        this.posY0 = this.gameHeight * 0.98 - this.height - 35; //Guardamos la posicion original para usarla como suelo
        this.posY = this.gameHeight * 0.98 - this.height - 35;
        this.velY = 1;

        this.image.frames = 3; //Indicamos el numero de frames que tiene la imagen
        this.image.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage
        this.velX = 9;
        this.bullets = [];
        this.player1 = undefined;
        this.laser = new Audio("sound_fx/PM_FSSF2_WEAPONS_H2_SHOT_324.mp3");
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames), //Punto x donde empieza a recortar
            122, //Punto y donde empieza a recortar
            Math.floor(this.image.width / this.image.frames), //Punto x donde termina de recortar
            45,
            this.posX,
            this.posY,
            this.width,
            this.height,
        );
        this.animate(framesCounter);
        this.bullets.forEach(bullet => bullet.draw());
        this.bullets.forEach(bullet => bullet.move());
    }

    animate(framesCounter) {
        if (framesCounter % 10 === 0) {
            this.image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
            if (this.posY === this.posY0) {
                if (this.image.framesIndex > 2) {
                    this.image.framesIndex = 0;
                }
            } else {
                this.image.framesIndex = 0
            }
        }
        if (framesCounter % 50 === 0) {
            this.shoot()
        }
    }

    move() {
        this.posX -= this.velX
    }

    shoot() {
        //Instanciamos nuevas balas
        this.laser.play()
        this.bullets.push(new Bullet(this.ctx, this.posX, this.posY - 60, this.posY0, this.height));
    }
}