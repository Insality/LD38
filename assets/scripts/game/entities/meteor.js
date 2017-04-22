var utils = require("Utils");
var gameEvents = require("gameEvents");

cc.Class({
    extends: cc.Component,

    properties: {
        rotationSpeed: 0,
        spriteList: {
            default: [],
            type: [cc.SpriteFrame]
        }
    },

    // use this for initialization
    onLoad: function () {
        var randomIdx = utils.getRandomInt(0, this.spriteList.length);
        var sprite = this.getComponent(cc.Sprite);
        sprite.spriteFrame = this.spriteList[randomIdx];
        
        this.rotationSpeed = cc.randomMinus1To1() * 5;
        
        var clickable = this.getComponent('clickable');
        if (clickable) {
            clickable._callback = function () {
                gameEvents.emit("meteorDestroy");
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
        cc.log(other);
        if (other.node.group == "player") {
            this.node.destroy();
            gameEvents.emit("worldHit");
        }
    },
});
