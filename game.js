const alienHome = {

    //////////////////--PROPIEDADES--////////////////////
    name: 'Alien Home Alone',
    description: 'HTML5 Canvas',
    author: 'Roberto Marrero',
    license: undefined,
    version: 'beta',

    // Velocidad de Frames Per Second.
    fpsCounter: 60,

    // Número de vidas del player.
    numberOfLifes: 3,

    // Propiedades inicializadas de forma global.
    alienWound: undefined,
    canvas: undefined,
    canvasDom: undefined,
    ctx: undefined,
    framesCounter: 0,
    gameOverScreenMsg: undefined,
    impactsOnBoss: 0,
    lastBossPosX: 0,
    lastBossPosY: 0,
    score: undefined,
    isRunning: false,

    // Tamaño del canvas.
    wSize: {
        width: 1200,
        height: 800,
    },
    // Definimos las teclas que pueden entrar en juego.
    keys: {
        TOP_KEY: 38,
        BOTTOM_KEY: 40,
        LEFT_KEY: 37,
        RIGHT_KEY: 39,
        SPACE: 32
    },

    // Definimos arrays.
    enemies: [],
    bosses: [],
    platforms: [],
    life: [],

    // Música.
    ost: new Audio("music/ost.mp3"),

    // SFX.
    explosionSound: new Audio("sound_fx/explosion_internal_loud_bang_blow_up_safe.mp3"),
    gameOverSound: new Audio("sound_fx/zapsplat_multimedia_male_voice_processed_says_game_over_002_23669.mp3"),
    grunt: new Audio("sound_fx/zapsplat_animals_bear_grunt_002_17144.mp3"),
    metalImpactSound: new Audio("sound_fx/zapsplat_impact_metal_large_loose_hit_light_006_38802.mp3"),
    scream: new Audio("sound_fx/wilhelm-scream-gaming-sound-effect-hd.mp3"),

    //////////////////--MÉTODOS--////////////////////
    //-------------INICIAMOS EL CANVAS-------------//
    init(id) {
        this.canvasDom = document.getElementById(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.canvasDom.width = this.wSize.width
        this.canvasDom.height = this.wSize.height
        this.isRunning = true
    },

    //-------------INICIAMOS EL JUEGO-------------//
    startGame() {
        this.reset()
        this.ost.play()
        this.interval = setInterval(() => {
            this.framesCounter++;
            if (this.framesCounter > 10000) this.framesCounter = 0; // Controlamos que frameCounter no sea superior a 10,000.
            if (this.framesCounter % 10 == 0) this.score++; // Aumentamos la puntuación de la partida cada 10 frames.
            this.clear()
            this.drawAll()
            this.moveAll()
            this.generateEnemies();
            this.clearEnemies();
            this.clearBosses();
            this.generatePlatforms();
            this.isPlatCollision();
            this.clearPlatforms();
            this.clearAcid();
            if (this.bosses.length != 0) {
                this.lastBossPosX = this.bosses[0].posX
                this.lastBossPosY = this.bosses[0].posY
            }
            if (this.player1.acids.length != 0 && this.enemies.length != 0) {
                if (this.isDeadEnemy()) {
                    this.enemies.splice(0, 1)
                    this.player1.acids.splice(0, 1)
                    this.score += 50
                    this.scream.play()
                }
            };
            if (this.player1.acids.length != 0 && this.bosses.length != 0) {
                if (this.isDeadBoss()) {
                    // this.explosion.draw(this.framesCounter, this.bosses[0].posX, this.bosses[0].posY)
                    this.bosses.splice(0, 1)
                    this.player1.acids.splice(0, 1)
                    this.score += 200
                    this.explosionSound.play()
                }
            };
            if (this.isCollision() || this.isCollisionBoss() || this.isCrashedBoss()) {
                if (this.framesCounter % 10 == 0) {
                    // Si hay impacto de bala de parte del enemigo, pierde una vida.
                    this.alienWound.draw((this.player1.posX + this.player1.width - 100), this.player1.posY + 70);
                    this.life.pop()
                    this.grunt.play()
                }
                if (this.life.length === 0) {
                    // Si pierde la última vida, Game Over.
                    setTimeout(() => { this.gameOver() }, 50)
                    this.gameOverSound.play()
                    this.scoreboard.init(this.ctx)
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
        this.boss = new Boss(this.ctx, this.wSize.width, this.wSize.height, this.keys, this.background, this.floor);
        this.platform = new Platform(this.ctx, 1);
        this.alienWound = new AlienWound(this.ctx)
        this.explosion = new Explosion(this.ctx)
        this.scoreboard = ScoreBoard;
        this.scoreboard.init(this.ctx);
        this.score = 0;
        for (i = 0; i < this.numberOfLifes; i++) {
            this.life.push(new LifeIcons(this.ctx, this.wSize.width, this.wSize.height, i));
        }
        this.gameOverScreenMsg = new GameOverScreen(this.ctx, this.wSize.width, this.wSize.height)
    },

    //------------REDIBUJAR TODOS LOS ELEMENTOS EN CADA FRAME------------//
    drawAll() {
        this.background.draw();
        this.floor.draw();
        this.platform.draw();
        this.platforms.forEach(plat => plat.draw());
        this.player1.draw(this.framesCounter);
        this.bosses.forEach(boss => boss.draw(this.framesCounter));
        this.enemies.forEach(ene => ene.draw(this.framesCounter));
        this.life.forEach(elm => elm.draw());
        if (this.isDeadBoss()) { this.explosion.draw(this.framesCounter, this.lastBossPosX, this.lastBossPosY) };
        this.drawScore();
    },

    //-------------ANIMAR LOS ELEMENTOS EN CADA FRAME--------------------//
    moveAll() {
        this.enemies.forEach(ene => ene.move());
        this.bosses.forEach(boss => boss.move());
        this.player1.jump(this.isOnPlatform());
        this.background.move()
        this.floor.move()
        this.player1.animate()
        this.explosion.animate(this.framesCounter)
        this.platforms.forEach(plat => plat.move());
    },

    //-------------LIMPIAR TODOS LOS ELEMENTOS EN CADA FRAME-------------//
    clear() {
        this.ctx.clearRect(0, 0, this.wSize.width, this.wSize.height);
    },

    //-------------GENERAR ENEMIGOS DE FORMA ALEATORIA------------------//
    generateEnemies() {
        if (this.framesCounter % Math.floor(Math.random() * (600 - 300 + 1) + 100) == 0) {
            this.enemies.push(new Enemy(this.ctx, this.wSize.width, this.wSize.height, this.player1));
        }
        if (this.framesCounter % 1000 === 0) {
            this.bosses.push(new Boss(this.ctx, this.wSize.width, this.wSize.height, this.player1));
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

    //------------LIMPIAR LOS BOSSES QUE SALEN DE PANTALLA------------//
    clearBosses() {
        this.bosses.forEach((boss, idx) => {
            if (boss.posX <= -200) {
                this.bosses.splice(idx, 1);
            }
        });
    },

    //-------------GENERAR PLATAFORMAS---------------------------------//
    generatePlatforms() {
        if (this.framesCounter % 200 == 0) {
            this.platforms.push(new Platform(this.ctx, Math.floor(Math.random() * 5 + 1)));
        }
    },

    //----------LIMPIAR LAS PLATAFORMAS QUE SALEN DE PANTALLA----------//
    clearPlatforms() {
        this.platforms.forEach((plat, idx) => {
            if (plat.posX <= -700) {
                this.platforms.splice(idx, 1);
            }
        });
    },

    //----LIMPIAR ÁCIDO QUE ESCUPE EL PLAYER A 700px DE SU POSICIÓN-----//   
    clearAcid() {
        this.player1.acids.forEach((plat, idx) => {
            if (plat.posX >= 700) {
                this.player1.acids.splice(idx, 1);
            }
        });
    },

    //-----DETECTAR LOS IMPACTOS DE BALAS ENEMIGAS SOBRE EL PLAYER-----//
    isCollision() {
        if (this.enemies.length !== 0) {
            return this.enemies[0].bullets.some(
                eachBullet =>
                    this.player1.posX + this.player1.width - 40 >= eachBullet.posX
                    && this.player1.posY + this.player1.height - 40 >= eachBullet.posY
                    && this.player1.posX + 40 <= eachBullet.posX + eachBullet.width
            )
        }
    },

    //-----DETECTAR LOS IMPACTOS DE BALAS DEL BOSS SOBRE EL PLAYER-----//
    isCollisionBoss() {
        if (this.bosses.length !== 0) {
            return this.bosses[0].bullets.some(
                eachBullet =>
                    this.player1.posX + this.player1.width - 40 >= eachBullet.posX
                    && this.player1.posX + 40 <= eachBullet.posX + eachBullet.width
                    && this.player1.posY + this.player1.height >= eachBullet.posY
                    && this.player1.posY <= eachBullet.posY
            )
        }
    },

    //-----DETECTAR LOS IMPACTOS DE BALAS DEL BOSS SOBRE EL PLAYER-----//
    isCrashedBoss() {
        if (this.bosses.length !== 0) {
            return this.bosses.some(
                eachBoss =>
                    this.player1.posX + this.player1.width - 40 >= eachBoss.posX
            )
        }
    },

    //---DETECTAR SI UNA PLATAFORMA CHOCA CON OTRA EN EL EJE X Y SALE REBOTADA---//
    isPlatCollision() {
        for (let i = 1; i < this.platforms.length; i++) {
            if (this.platforms[i].posX <= this.platforms[i - 1].posX + this.platforms[i - 1].width
                && this.platforms[i].posY == this.platforms[i - 1].posY) {
                this.platforms[i].velXodd = 20
            } else if (this.platforms[i].posX + this.platforms[i].width > 1600) {
                this.platforms[i].velXodd = -20
            }
        }
    },

    //-------DETECTAR SI EL ÁCIDO IMPACTA SOBRE LOS ENEMIGOS------//
    isDeadEnemy() {
        return this.player1.acids.some(
            eachAcid =>
                this.enemies[0].posX <= eachAcid.posX && this.enemies[0].posY <= eachAcid.posY
        )
    },

    //-------DETECTAR SI EL ÁCIDO IMPACTA 3 VECES SOBRE EL BOSS------//
    isDeadBoss() {
        if (this.bosses.length != 0) {
            if (this.player1.acids.some(eachAcid => this.bosses[0].posX <= eachAcid.posX && this.bosses[0].posY <= eachAcid.posY)) {
                this.metalImpactSound.play()
                this.impactsOnBoss++
                if (this.impactsOnBoss >= 3) {
                    this.impactsOnBoss = 0
                    return true
                }
            }
        }
    },

    //---------------DIBUJA EL MARCADOR DE PUNTOS-----------------//
    drawScore() {
        this.scoreboard.update(this.score);
    },

    //-----DETECTAR SI EL PLAYER SE QUEDA SOBRE UNA PLATAFORMA-----//
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

    //---------------MUESTRA EL MENSAJE DE GAME OVER, PARA LA MÚSICA Y LIMPIA EL INTERVALO-----------------//
    gameOver() {
        this.gameOverScreenMsg.draw()
        this.ost.pause()
        clearInterval(this.interval)
    },

}