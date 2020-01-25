const alienHome = {
    name: 'Alien Home Alone',
    description: 'HTML5 Canvas',
    author: 'Roberto Marrero',
    license: undefined,
    version: 'beta',
    canvasDom: undefined,
    ctx: undefined,
    fpsCounter: 60,
    canvas: undefined,
    wSize: {
        width: 900,
        height: 700,
    },

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
            // this.generateObstacles()
            // this.clearObstacles()
            // this.isCollision()
            // if (this.isCollision()) {
            //     this.gameOver();
            // }
            // this.score += 0.01;
            // this.drawScore();
        }, 1000 / this.fpsCounter)

    },

    reset() {

        this.background = new Background(this.ctx, this.wSize.width, this.wSize.height)
        //this.player = new Player(this.ctx, this.wSize.width, this.wSize.height);

    },

    drawAll() {

        this.background.draw();
        //this.player.draw(this.framesCounter);

    },

    moveAll() {
        this.background.move();
        //this.player.move();

    },

    clear() {
        this.ctx.clearRect(0, 0, this.wSize.width, this.wSize.height);
    },

    gameOver() {
        //Gameover detiene el juego.
        clearInterval(this.interval);
    },



}