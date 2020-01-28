const alienHome = {
    name: 'Alien Home Alone',
    description: 'HTML5 Canvas',
    author: 'Roberto Marrero',
    license: undefined,
    version: 'beta',
    canvasDom: undefined,
    ctx: undefined,
    fpsCounter: 60,
    score: undefined,
    framesCounter: 0,
    canvas: undefined,
    wSize: {
        width: 1200,
        height: 800,
    },
    keys: {
        TOP_KEY: 38,
        BOTTOM_KEY: 40,
        LEFT_KEY: 37,
        RIGHT_KEY: 39,
        SPACE: 32
    },
    enemies: [],
    platforms: [],

    ///////////////MÉTODOS/////////////
    //-------------INICIAMOS EL CANVAS-------------//
    init(id) {
        this.canvasDom = document.getElementById(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.canvasDom.width = this.wSize.width
        this.canvasDom.height = this.wSize.height
        this.startGame()
    },

    //-------------INICIAMOS EL JUEGO-------------//
    startGame() {
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter++;
            this.clear()
            this.drawAll()
            this.moveAll()
            this.generateEnemies();
            this.clearEnemies();
            this.generatePlatforms();
            this.clearPlatforms();
            if (this.player1.acids.length != 0 && this.enemies.length != 0) {
                if (this.isDeadEnemy()) {
                    this.enemies.splice(0, 1)
                    this.player1.acids.splice(0, 1)
                }
            }
            if (this.enemies.length != 0) {

                if (this.isCollision()) {
                    this.gameOver();
                }

            };
            this.isOnPlatform();

        }, 1000 / this.fpsCounter)
    },


    //-------------RESET GMAE-------------//
    reset() {
        this.background = new Background(this.ctx, this.wSize.width, this.wSize.height)
        this.floor = new Floor(this.ctx, this.wSize.width, this.wSize.height)
        this.player1 = new Player(this.ctx, this.wSize.width, this.wSize.height, this.keys, this.background, this.floor);
        this.enemy1 = new Enemy(this.ctx, this.wSize.width, this.wSize.height, this.keys, this.background, this.floor);
        this.platform = new Platform(this.ctx, this.framesCounter);
    },


    drawAll() {
        this.background.draw();
        this.floor.draw();
        this.platform.draw();
        this.platforms.forEach(plat => plat.draw(this.framesCounter));
        this.player1.draw(this.framesCounter);
        this.enemies.forEach(ene => ene.draw(this.framesCounter));
    },

    moveAll() {
        this.enemies.forEach(ene => ene.move());
        this.player1.jump(this.framesCounter);
        this.background.move()
        this.floor.move()
        this.player1.animate()
        this.platforms.forEach(plat => plat.move());
    },

    clear() {
        this.ctx.clearRect(0, 0, this.wSize.width, this.wSize.height);
    },

    generateEnemies() {
        if (this.framesCounter % 400 == 0) {
            this.enemies.push(new Enemy(this.ctx, this.wSize.width, this.wSize.height, this.player1)); //pusheamos nuevos obstaculos
        }
    },

    clearEnemies() {
        this.enemies.forEach((ene, idx) => {
            if (ene.posX <= -200) {
                this.enemies.splice(idx, 1);
            }
        });
    },

    generatePlatforms() {
        if (this.framesCounter % 200 == 0) {
            this.platforms.push(new Platform(this.ctx)); //pusheamos nuevos obstaculos
        }
    },

    clearPlatforms() {
        this.platforms.forEach((plat, idx) => {
            if (plat.posX <= -500) {
                this.platforms.splice(idx, 1);
            }
        });
    },

    isCollision() {
        // funcion para comprobar colisiones

        return this.enemies[0].bullets.some(
            eachBullet =>
                this.player1.posX + this.player1.width - 40 >= eachBullet.posX
                && this.player1.posY + this.player1.height - 50 >= eachBullet.posY
                && this.player1.posX + 40 <= eachBullet.posX + eachBullet.width
        )
        //fin del juego, detenemos intervalo
    },

    isDeadEnemy() {
        return this.player1.acids.some(
            eachAcid =>
                this.enemies[0].posX <= eachAcid.posX && this.enemies[0].posY <= eachAcid.posY
        )
    },

    isOnPlatform() {

        // if (this.player1.posX + this.player1.width >= this.platforms[0].posX && this.player1.posX <= this.platforms[0].posX + this.platforms[0].width && this.player1.posY + 200 <= this.platforms[0].posY) {
        //     return true
        // }
        // 
        // )

        let collision = this.platforms.find(obs => {
            return (
                this.player1.posX + this.player1.width >= obs.posX &&
                this.player1.posY + this.player1.height >= obs.posY &&
                this.player1.posX <= obs.posX + obs.width - 120 &&
                this.player1.posY + this.player1.height <= obs.posY + obs.height &&
                this.player1.velY > 0
            )
        })

        if (collision) {
            this.player1.obj = collision
            this.player1.posY0 = collision.posY - this.player1.height
            this.player1.posY = this.player1.posY0 + 60
            console.log(this.player1.posY0)

        } else {
            this.player1.posY0 = this.wSize.height - this.player1.height
        }




    },



    gameOver() {
        //Gameover detiene el juego.
        clearInterval(this.interval);

    },





}