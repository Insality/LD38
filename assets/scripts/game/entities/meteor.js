var utils = require("Utils");
var gameEvents = require("gameEvents");

cc.Class({
    extends: cc.Component,

    properties: {
        rotationSpeed: 0,
        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        },
        explodeParticle: cc.Prefab,
    },

    // use this for initialization
    onLoad: function () {
        var randomIdx = utils.getRandomInt(0, this.spriteList.length);
        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteList[randomIdx];
        
        this.rotationSpeed = cc.randomMinus1To1() * 5;
        
        var inputControl = this.getComponent('inputControl');
        if (inputControl) {
            var self = this;
            inputControl.onClick = function () {
                gameEvents.emit("meteorDestroy");
                
                var particle = cc.instantiate(self.explodeParticle);
                particle.parent = this.node.parent;
                particle.position = cc.p(this.node.x, this.node.y);
            
                this.node.destroy();
            }
        }
        
        
        this.updateSpeed();
    },

    updateSpeed: function() {
        this.speed = cc.p(this.node.position.x, this.node.position.y)
            .normalize()
            .mul(150 + cc.random0To1()*100)
            .neg();
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        // this.node.x -= 4;
        this.node.rotation += this.rotationSpeed;
        
        this.node.x += this.speed.x * dt;
        this.node.y += this.speed.y * dt;
    },
    
    onCollisionEnter: function (other) {
        if (other.node.group == "player") {
            var particle = cc.instantiate(this.explodeParticle);
            particle.parent = this.node.parent;
            particle.position = cc.p(this.node.x, this.node.y);
            
            this.node.destroy();
            gameEvents.emit("worldHit");
        }
    },
});
