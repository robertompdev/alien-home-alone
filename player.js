class Player {
    constructor(ctx, w, h, keys, background, floor) {
        this.ctx = ctx;
        this.gameWidth = w;
        this.gameHeight = h;

        this.image = new Image();
        this.image.src = 'images/player1.gif';

        this.width = 280;
        this.height = 280;

        this.posX = 80;
        this.posY0 = this.gameHeight * 0.98 - this.height; //Guardamos la posicion original para usarla como suelo
        this.posY = this.gameHeight * 0.98 - this.height;
        this.velY = 1;

        this.image.frames = 5; //Indicamos el numero de frames que tiene la imagen
        this.image.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage

        this.keys = keys;
        this.movingRight = false

        this.background = background
        this.floor = floor
        this.setListeners();
    }

    draw(framesCounter) {
        let zeroDieB = 0
        let zeroDieA = 0
        if (this.posY >= this.posY0) {
            zeroDieB = this.image.height - 470;
            zeroDieA = 0;
        } else {
            zeroDieB = this.image.height - 470; //Punto y donde termina de recortar
            zeroDieA = 240;
        };

        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames), //Punto x donde empieza a recortar
            zeroDieA, //Punto y donde empieza a recortar
            Math.floor(this.image.width / this.image.frames), //Punto x donde termina de recortar
            zeroDieB,
            this.posX,
            this.posY,
            this.width,
            this.height
        );
        this.animate(framesCounter);

        //Funcion que anima los frames.

        //this.bullets.forEach(bullet => bullet.draw()); //El player dibuja las balas.
    }

    jump() {
        let gravity = 0.5;

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

    animate(framesCounter) {
        console.log("entro", this.movingRight)
        if (this.movingRight) {

            if (framesCounter % 24 === 0) {
                this.image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
                if (this.posY === this.posY0) {
                    if (this.image.framesIndex > 2) {
                        this.image.framesIndex = 0;
                    }
                } else {
                    this.image.framesIndex = 0
                }
            }
        }
    }

    setListeners() {
        document.addEventListener("keydown", e => {
            if (e.keyCode === this.keys.TOP_KEY) {

                if (this.posY >= this.posY0) {
                    //Comprobamos que el player este en el suelo antes de saltar
                    this.posY -= 40; //Añadimos algo de velocidad al salto para generar el efecto de suavidad y que la gravedad no tire directamente de él
                    this.velY -= 20;
                }
            } else if (e.keyCode === this.keys.RIGHT_KEY) {
                console.log("entro tecla")
                this.movingRight = true
                this.background.move()
                this.floor.move()
            } else if (e.keyCode === this.keys.SPACE) {
            } else {
                this.movingRight = false
            }
        });

        document.addEventListener("keyup", e => {
            if (e.keyCode == this.keys.RIGHT_KEY) {
                this.movingRight = false
            }
        });
    }
}