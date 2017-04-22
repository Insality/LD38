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
        gameRoot: cc.Node,
        anim: cc.Animation,
        meteorPrefab: cc.Prefab,
        invaderPrefab: cc.Prefab,
        ufoPrefab: cc.Prefab
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
        }, this);
        
        gameEvents.on("worldHit", function() {
            this.health -= 4;
        }, this);
        
        this.initLevel();
    },

    setSituation: function(situation, nextTimer) {
        this.currentSituationName = situation
        this.currentSituation = situations[this.currentSituationName];
        this.anim.play("changeSituation");
        this.updateUI();
    },

    updateUI: function() {
        this.gameUI.setDesc(this.currentSituation.desc);
        this.gameUI.setHint(this.currentSituation.hint);
        this.gameUI.setPower(this.power);
        
    },
    
    _addLevel: function(type, time) {
        this.situationsRow.push({type: type, time: time});  
    },

    initLevel: function() {
        this.nextSituationTimer = 0;
        this.situationsRow = [];
        this._addLevel("rest", 5);
        this._addLevel("meteorits", 20);
        this._addLevel("rest", 5);
        this._addLevel("meteorits", 30);
        this._addLevel("rest", 5);
    };

    onLoad: function () {
        this.init();
        
    },

    update: function (dt) {
        if (this.nextSituationTimer >= 0) {
            this.nextSituationTimer -= dt;
            if (this.nextSituationTimer < 0 && this.situationsRow.length > 0) {
                var nextSituation = this.situationsRow.shift();
                
                this.setSituation(nextSituation.type);
                this.nextSituationTimer = nextSituation.time;
                
            }
        }
        
        if (this.currentSituation) {
            switch (this.currentSituationName) {
                case "grow":
                    break;
                case "meteorits":
                    this.processMeteorites(dt);
                    break;
                default: 
                    break;    
            }
        }
    },
    
    processMeteorites: function(dt) {
        this.spawnMeteorTime -= dt;
        if (this.spawnMeteorTime < 0) {
            this.spawnMeteorTime = cc.clampf(0.5 - (this.difficulty/10), 0.2, 0.5) + cc.random0To1()*0.4;
            var meteor = cc.instantiate(this.meteorPrefab);
            meteor.parent = this.gameRoot;
            var radius = 800;
            var angle = cc.random0To1() * Math.PI*2;
            meteor.position = cc.p(radius * Math.cos(angle), radius * Math.sin(angle));
            meteor.getComponent("meteor").updateSpeed();
        }
    },
});
