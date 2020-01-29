const ScoreBoard = {
    ctx: undefined,

    init: function (ctx) {
        this.ctx = ctx
        this.ctx.font = "70px monospace"
    },

    update: function (score) {
        this.ctx.fillStyle = "#04fc00";
        this.ctx.fillText(Math.floor(score).toString().padStart(7, "0000000"), 50, 70);
    }
};