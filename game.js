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
    life: [],
    ost: new Audio("music/ost.mp3"),
    scream: new Audio("sound_fx/wilhelm-scream-gaming-sound-effect-hd.mp3"),
    grunt: new Audio("sound_fx/zapsplat_animals_bear_grunt_002_17144.mp3"),
    gameOverSound: new Audio("sound_fx/zapsplat_multimedia_male_voice_processed_says_game_over_002_23669.mp3"),
    gameOverScreenMsg: GameOverScreen,


    //////////////////--MÉTODOS--////////////////////
    //-------------INICIAMOS EL CANVAS-------------//
    init(id) {
        this.canvasDom = document.getElementById(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.canvasDom.width = this.wSize.width
        this.canvasDom.height = this.wSize.height
    },

    //-------------INICIAMOS EL JUEGO-------------//
    startGame() {
        this.reset()
        this.ost.play()
        this.interval = setInterval(() => {
            this.framesCounter++;
            // controlamos que frameCounter no sea superior a 1000
            if (this.framesCounter > 1000) this.framesCounter = 0;

            // controlamos la velocidad de generación de obstáculos
            if (this.framesCounter % 10 == 0) this.score++; //Aumentamos la puntuación de la partida cada 100 frames.
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
                    this.score += 50
                }
            }
            if (this.enemies.length != 0) {

                if (this.isCollision()) {
                    if (this.framesCounter % 10 == 0) {
                        //si hay impacto de bala de parte del enemigo, pierde una vida
                        this.life.pop()
                        this.grunt.play()

                    }
                    if (this.life.length === 0) {
                        // si pierde la última vida, Game Over
                        this.gameOverSound.play();
                        this.scoreboard.init(this.ctx);
                        this.gameOver();
                    }
                }

            };
            this.isOnPlatform();

        }, 1000 / this.fpsCounter)
    },


    //---------------------------RESET GAME------------------------------//
    reset() {
        this.background = new Background(this.ctx, this.wSize.width, this.wSize.height)
        this.floor = new Floor(this.ctx, this.wSize.width, this.wSize.height)
        this.player1 = new Player(this.ctx, this.wSize.width, this.wSize.height, this.keys, this.background, this.floor);
        this.enemy1 = new Enemy(this.ctx, this.wSize.width, this.wSize.height, this.keys, this.background, this.floor);
        this.platform = new Platform(this.ctx, this.framesCounter);
        this.scoreboard = ScoreBoard;
        this.scoreboard.init(this.ctx);
        this.score = 0;
        for (i = 0; i < 3; i++) {
            this.life.push(new LifeIcons(this.ctx, this.wSize.width, this.wSize.height, i));
        }
    },

    //------------REDIBUJAR TODOS LOS ELEMENTOS EN CADA FRAME------------//
    drawAll() {
        this.background.draw();
        this.floor.draw();

        this.platform.draw();
        this.platforms.forEach(plat => plat.draw(this.framesCounter));
        this.player1.draw(this.framesCounter);
        this.enemies.forEach(ene => ene.draw(this.framesCounter));
        this.life.forEach(elm => elm.draw());
        this.drawScore();

    },

    //-------------ANIMAR LOS ELEMENTOS EN CADA FRAME--------------------//
    moveAll() {
        this.enemies.forEach(ene => ene.move());
        this.player1.jump(this.framesCounter);
        this.background.move()
        this.floor.move()
        this.player1.animate()
        this.platforms.forEach(plat => plat.move());
    },

    //-------------LIMPIAR TODOS LOS ELEMENTOS EN CADA FRAME-------------//
    clear() {
        this.ctx.clearRect(0, 0, this.wSize.width, this.wSize.height);
    },

    //-------------GENERAR ENEMIGOS-------------------------------------//
    generateEnemies() {
        if (this.framesCounter % Math.floor(Math.random() * (600 - 300 + 1) + 100) == 0) {
            this.enemies.push(new Enemy(this.ctx, this.wSize.width, this.wSize.height, this.player1));
        }
    },

    //------------LIMPIAR LOS ENEMIGOS QUE SALEN DE PANTALLA------------//
    clearEnemies() {
        this.enemies.forEach((ene, idx) => {
            if (ene.posX <= -200) {
                this.enemies.splice(idx, 1);
            }
        });
    },

    generatePlatforms() {
        if (this.framesCounter % 200 == 0) {
            this.platforms.push(new Platform(this.ctx));
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
        return this.enemies[0].bullets.some(
            eachBullet =>
                this.player1.posX + this.player1.width - 40 >= eachBullet.posX
                && this.player1.posY + this.player1.height - 50 >= eachBullet.posY
                && this.player1.posX + 40 <= eachBullet.posX + eachBullet.width
        )
    },

    isDeadEnemy() {

        this.scream.play()
        return this.player1.acids.some(
            eachAcid =>
                this.enemies[0].posX <= eachAcid.posX && this.enemies[0].posY <= eachAcid.posY
        )


    },

    drawScore() {
        //con esta funcion pintamos el marcador
        this.scoreboard.update(this.score);
    },

    isOnPlatform() {
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
        } else {
            this.player1.posY0 = this.wSize.height - this.player1.height
        }
    },

    gameOver() {

        clearInterval(this.interval)
        this.ost.pause()

    },

}