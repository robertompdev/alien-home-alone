class Explosion {
    constructor(ctx) {
        this.ctx = ctx;

        this.image = new Image();
        this.image.src = 'images/explosion.png';

        this.width = 400;
        this.height = 400;

        this.posX = 0;
        this.posY = 0;

        this.image.frames = 5; //Indicamos el numero de frames que tiene la imagen
        this.image.framesIndex = 0; //Frame actual menos 1, lo usaremos para recortar la imagen en drawImage

    }

    draw(framesCounter, posX, posY) {

        this.ctx.drawImage(
            this.image,
            this.image.framesIndex * Math.floor(this.image.width / this.image.frames), //Punto x donde empieza a recortar
            0, //Punto y donde empieza a recortar
            Math.floor(this.image.width / this.image.frames), //Punto x donde termina de recortar
            200,
            posX,
            posY - 60,
            this.width,
            this.height,

        );
        this.animate(framesCounter);

    }

    animate(framesCounter) {

        if (framesCounter % 70 === 0) {
            this.image.framesIndex++; //Cambiamos el frame de la imagen cada 5 fps.
            if (this.image.framesIndex > 5) {
                this.image.framesIndex = 0;
            }

        }


    }
}