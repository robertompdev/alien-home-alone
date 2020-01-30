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

    jump() {
        let gravity = 0.7;

        if (this.posY <= this.posY0) {

            this.posY += this.velY;
            this.velY += gravity;

        } else {

            this.velY = 1;
            this.posY = this.posY0;
        }

    }

    animate(framesCounter) {

        if (framesCounter % 15 === 0) {
            this.image.framesIndex++;
            if (this.image.framesIndex > 2) {
                this.image.framesIndex = 0;
            }
        }

    }

    setListeners(isOnPlatform) {
        document.addEventListener("keyup", e => {
            if (e.keyCode === this.keys.TOP_KEY) {

                if (this.posY >= this.posY0) {
                    this.posY -= 40; //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
                    this.velY -= 20;
                    // } else if (isOnPlatform) {
                    //     this.posY -= 40; //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
                    //     this.velY -= 20;

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
