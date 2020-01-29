class Player {
    constructor(ctx, w, h, keys, isOnPlatform) {
        this.ctx = ctx;
        this.gameWidth = w;
        this.gameHeight = h;

        this.image = new Image();
        this.image.src = 'images/playerbasic.gif';

        this.width = 300;
        this.height = 280;

        this.posX = 80;
        this.posY0 = this.gameHeight * 0.98 - this.height; //Guardamos la posicion original para usarla como suelo
        this.posY = this.gameHeight * 0.98 - this.height;
        this.velY = 120;

        this.image.frames = 3; //Indicamos el numero de frames que tiene la imagen
        this.image.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage
        this.keys = keys;
        this.isOnPlatform = isOnPlatform;

        this.acids = [];

        this.setListeners();
    }

    draw(framesCounter) {
        // let zeroDieB = 0
        // let zeroDieA = 0
        // if (this.posY >= this.posY0) {
        //     zeroDieB = this.image.height - 240;
        //     zeroDieA = 0;
        // } else {
        //     zeroDieB = this.image.height - 240; //Punto y donde termina de recortar
        //     zeroDieA = 120;
        // };

        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames), //Punto x donde empieza a recortar
            0, //Punto y donde empieza a recortar
            Math.floor(this.image.width / this.image.frames), //Punto x donde termina de recortar
            120,
            this.posX,
            this.posY,
            this.width,
            this.height
        );
        this.animate(framesCounter);
        this.acids.forEach(acids => acids.draw());
        this.acids.forEach(acids => acids.move());




    }

    jump(isOnPlatform) {
        let gravity = 0.7;

        if (this.posY <= this.posY0) {

            //Comprobamos que el player nunca sobrepase el suelo.

            this.posY += this.velY;
            this.velY += gravity;

        } else {
            //Si lo hace reseteamos posición y velocidad
            this.velY = 1;
            this.posY = this.posY0;
        }

        //this.bullets.forEach(bullet => bullet.move()); //Movemos las balas
    }

    // jumpOnPlatform() {
    //     let gravity = 0.7;

    //     if (this.posY <= this.posY0 + 200) {

    //         //Comprobamos que el player nunca sobrepase el suelo.

    //         this.posY += this.velY;
    //         this.velY += gravity;

    //     } else {
    //         //Si lo hace reseteamos posición y velocidad
    //         this.velY = 1;
    //         this.posY = this.posY0;
    //     }

    //     //this.bullets.forEach(bullet => bullet.move()); //Movemos las balas
    // }



    animate(framesCounter) {
        if (framesCounter % 20 === 0) {
            this.image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
            //if (this.posY === this.posY0) {
            if (this.image.framesIndex > 2) {
                this.image.framesIndex = 0;
            }
            // } else {
            //   this.image.framesIndex = 0
            //}
        }

    }

    setListeners(isOnPlatform) {
        document.addEventListener("keydown", e => {
            if (e.keyCode === this.keys.TOP_KEY) {

                if (this.posY >= this.posY0) {
                    //Comprobamos que el player este en el suelo antes de saltar
                    this.posY -= 40; //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
                    this.velY -= 20;
                }

            } else if (e.keyCode === this.keys.SPACE) {
                this.shoot();

            }
        });

    }

    shoot() {

        //Instanciamos nuevas balas
        this.acids.push(new Acid(this.ctx, this.posX, this.posY, this.posY0, this.height));

    }
}
