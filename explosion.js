class Explosion {
    constructor(ctx) {
        this.ctx = ctx;

        this.image = new Image();
        this.image.src = 'images/explosion.png';

        this.width = 200;
        this.height = 800;

        this.posX = 0;
        this.posY = 0;

        this.image.frames = 14; //Indicamos el numero de frames que tiene la imagen
        this.image.framesIndex = 10; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage
    }

    draw(framesCounter, posX, posY) {
        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames), //Punto x donde empieza a recortar
            0, //Punto y donde empieza a recortar
            50, //Punto x donde termina de recortar
            300,
            posX,
            posY + 60,
            this.width,
            this.height,
        );
        this.animate(framesCounter);
    }

    animate(framesCounter) {
        if (framesCounter % 30 === 0) {
            this.image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
            if (this.image.framesIndex > 4) {
                this.image.framesIndex = 0;
            }
        }
    }
}