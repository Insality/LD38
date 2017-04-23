cc.Class({
    extends: cc.Component,

    properties: {
        score: cc.Label,
        highscore: cc.Label
    },

    // use this for initialization
    onLoad: function () {
        this.score.string = "Your score: " + Math.round(cc.sys.localStorage["lastScore"]);
        this.highscore.string = "Highscore: " + cc.sys.localStorage["highscore"]
    },
});
