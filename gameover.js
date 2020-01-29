const GameOverScreen = {
    ctx: undefined,

    init: function (ctx) {
        this.ctx = ctx
        this.ctx.font = "200px monospace"
        this.ctx.fillStyle = "#04fc00";
        this.ctx.fillText("GAME OVER", 50, 50);
    },

};