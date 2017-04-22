var gameEvents = require("gameEvents");
var situations = require("situations");

cc.Class({
    extends: cc.Component,

    properties: {
        gameUI: cc.Node,
        difficulty: 1,
        health: 20,
        power: 0,
        
        spawnMeteorTime: 0,
        
        gameRoot: {
            type: cc.Node,
            default: null
        },
        meteorPrefab: {
            type: cc.Prefab,
            default: null
        },
        invaderPrefab: {
            type: cc.Prefab,
            default: null
        },
        ufoPrefab: {
            type: cc.Prefab,
            default: null
        },
    },

    init: function() {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        
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
            this.health -= 4;
            cc.log(this.health);
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

    onLoad: function () {
        this.init();
        this.setSituation(situations["grow"]);
    },

    update: function (dt) {
        this.processMeteorites(dt);
    },
    
    processMeteorites: function(dt) {
        this.spawnMeteorTime -= dt;
        if (this.spawnMeteorTime < 0) {
            this.spawnMeteorTime = cc.clampf(0.5 - (this.difficulty/10), 0.2, 0.5) + cc.random0To1()*0.4;
            var meteor = cc.instantiate(this.meteorPrefab);
            meteor.parent = this.gameRoot;
            //this.canvas.node.addChild(monster);
            var radius = 800;
            var angle = cc.random0To1() * Math.PI*2;
            meteor.position = cc.p(radius * Math.cos(angle), radius * Math.sin(angle));
            meteor.getComponent("meteor").updateSpeed();
        }
    },
});
