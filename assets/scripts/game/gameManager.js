var gameEvents = require("gameEvents");
var situations = require("situations");

cc.Class({
    extends: cc.Component,

    properties: {
        gameUI: cc.Node,
        difficulty: 0,
        health: 20,
        power: 0,
        
        world: cc.Node,
        spawnMeteorTime: 0,
        spawnInvadersTime: 0,
        spawnEnemyUfoTime: 0,
        gameRoot: cc.Node,
        anim: cc.Animation,
        meteorPrefab: cc.Prefab,
        invaderPrefab: cc.Prefab,
        ufoPrefab: cc.Prefab
    },

    setSituation: function(situation, nextTimer) {
        this.currentSituationName = situation
        this.currentSituation = situations[this.currentSituationName];
        this.anim.play("changeSituation");
        this.world.mode = situation;
        this.world.target = cc.p(0, 0);
        
        if (situation !== "rest") {
            this.power += 50;
        }
        
        
    },

    updateUI: function() {
        this.gameUI.setDesc(this.currentSituation.desc);
        this.gameUI.setHint(this.currentSituation.hint);
        this.gameUI.setPower(Math.round(this.power));
    },
    
    _addLevel: function(type, time) {
        this.situationsRow.push({type: type, time: time});  
    },

    initLevel: function() {
        this.nextSituationTimer = 0;
        this.situationsRow = [];
        this._addLevel("rest", 1);
        this._addLevel("grow", 20);
        this._addLevel("rest", 5);
        this._addLevel("meteorits", 30);
        this._addLevel("rest", 5);
    },

    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;
        this.world = this.world.getComponent("world");
        
        this.gameUI = this.gameUI.getComponent('gameGUIDisplay');  
        gameEvents.on("worldGrow", function(e) {
            if (this.currentSituationName == "grow") {
                this.power += 10;
            }
        }, this);
        
        gameEvents.on("meteorDestroy", function() {
            this.power += 5;
        }, this);
        
        gameEvents.on("worldHit", function() {
            this.health -= 4;
        }, this);
        
        this.initLevel();
    },

    update: function (dt) {
        this.power += dt * 10;
        if (this.currentSituation) {
            this.updateUI();
        }
        
        if (this.nextSituationTimer >= 0) {
            this.nextSituationTimer -= dt;
            if (this.nextSituationTimer < 0 && this.situationsRow.length > 0) {
                var nextSituation = this.situationsRow.shift();
                
                this.setSituation(nextSituation.type);
                this.nextSituationTimer = nextSituation.time;
                
            }
        }
        
        if (this.currentSituation && this.nextSituationTimer > 2) {
            switch (this.currentSituationName) {
                case "grow":
                    break;
                case "meteorits":
                    this.processMeteorites(dt);
                    break;
                case "invaders":
                    this.processInvaders(dt);
                    break;
                case "lasers":
                    this.processEnemyUfo(dt);
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
    
    processInvaders: function(dt) {
        this.spawnInvadersTime -= dt;
        if (this.spawnInvadersTime < 0) {
            this.spawnInvadersTime = 1;
            var invader = cc.instantiate(this.invaderPrefab);
            invader.parent = this.gameRoot;
            invader.position = cc.p(800, cc.randomMinus1To1()*200);
        }
    },
    
    processEnemyUfo: function(dt) {
        this.spawnEnemyUfoTime -= dt;
        if (this.spawnEnemyUfoTime < 0) {
            this.spawnEnemyUfoTime = 6;
            var enemyUfo = cc.instantiate(this.ufoPrefab);
            enemyUfo.parent = this.gameRoot;
            enemyUfo.position = cc.p(900, 175);
        }
    },
});
