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



    init(id) {
        this.canvasDom = document.getElementById(id)
        this.ctx = this.canvasDom.getContext('2d')
        this.canvasDom.width = this.wSize.width
        this.canvasDom.height = this.wSize.height
        this.startGame()
    },

    startGame() {
        this.reset()
        this.interval = setInterval(() => {
            this.framesCounter++;
            this.clear()
            this.drawAll()
            this.moveAll()
            this.generateEnemies();
            this.clearEnemies();
        }, 1000 / this.fpsCounter)

    },

    reset() {
        this.background = new Background(this.ctx, this.wSize.width, this.wSize.height)
        this.floor = new Floor(this.ctx, this.wSize.width, this.wSize.height)
        this.player1 = new Player(this.ctx, this.wSize.width, this.wSize.height, this.keys, this.background, this.floor);
        this.enemy1 = new Enemy(this.ctx, this.wSize.width, this.wSize.height, this.keys, this.background, this.floor);
    },

    drawAll() {
        this.background.draw();
        this.floor.draw();
        this.player1.draw(this.framesCounter);
        this.enemies.forEach(ene => ene.draw(this.framesCounter));
        ;

    },

    moveAll() {
        //this.background.move();
        this.enemies.forEach(ene => ene.move());
        this.player1.jump(this.framesCounter);
    },

    clear() {
        this.ctx.clearRect(0, 0, this.wSize.width, this.wSize.height);
    },

    generateEnemies() {
        if (this.framesCounter % 400 == 0) {
            //Generamos obstaculos cada 400 frames.
            this.enemies.push(new Enemy(this.ctx, this.wSize.width, this.wSize.height)); //pusheamos nuevos obstaculos
        }
    },

    clearEnemies() {
        //funcion para limpiar obs
        this.enemies.forEach((ene, idx) => {
            if (ene.posX <= -200) {
                this.enemies.splice(idx, 1);
            }
        });
    },

    gameOver() {
        //Gameover detiene el juego.
        clearInterval(this.interval);
    },





}