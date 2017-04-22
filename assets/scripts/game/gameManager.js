var gameEvents = require("gameEvents");
var situations = require("situations");

cc.Class({
    extends: cc.Component,

    properties: {
        gameUI: cc.Node,
        power: 0,
    },

    init: function() {
        cc.director.getCollisionManager().enabled = true;
        this.gameUI = this.gameUI.getComponent('gameGUIDisplay');  
        gameEvents.on("worldGrow", function(e) {
            this.power++;
            this.updateUI();
        }, this);
        gameEvents.on("meteorDestroy", function() {
            cc.log("meteorDestroy");
        }, this);
        gameEvents.on("worldHit", function() {
            cc.log("worldHit");
        }, this);
    },

    setSituation: function(situation) {
        this.currentSituation = situation;
        this.updateUI();
    },

    updateUI: function() {
        this.gameUI.setDesc(this.currentSituation.desc);
        this.gameUI.setHint(this.currentSituation.hint);
        this.gameUI.setPower(this.power);
        
    },

    // use this for initialization
    onLoad: function () {
        this.init();
        this.setSituation(situations["grow"]);
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
